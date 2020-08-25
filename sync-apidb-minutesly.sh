# !/bin/bash
set -e

set > /tmp/set-output1
echo "yes" >> /tmp/run.log
PATH=/home/chentoz/Downloads/local-osmosis/bin:/usr/local/go/bin:/home/chentoz/Downloads/local-osmosis/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/chentoz/go/bin:/home/chentoz/go/bin
echo "no" >> /tmp/run.log
echo $PATH > /tmp/path

NOW=$(date -u +"%Y-%m-%d_%H:%M:%S")

MIN_AGO=$(date -u -d "$1 min ago" +"%Y-%m-%d_%H:%M:%S")
MAPSTYLE=ajt
PGHOST=localhost
PGUSER=chentoz
PGPASS=1
PGDATABASE_EDIT=gis-edit
PGDATABASE_RENDER=gis

OSMOSIS_BIN=/home/chentoz/Downloads/local-osmosis/bin/osmosis
OSM2PGSQL_BIN=/usr/local/bin/osm2pgsql
OSM2PGSQL_OPTIONS="-v -d $PGDATABASE_RENDER -G --hstore -r xml --tag-transform-script /home/chentoz/Downloads/openstreetmap-carto/openstreetmap-carto.lua -C 9999 --number-processes 5 -S /home/chentoz/Downloads/openstreetmap-carto/openstreetmap-carto.style"

RENDER_BIN=/usr/local/bin/render_expired
RENDER_OPTIONS="-m $MAPSTYLE -z $EXPIRY_MINZOOM -Z $EXPIRY_MAXZOOM -n 5"
# RENDER_OPTIONS="-m $MAPSTYLE -z $EXPIRY_MINZOOM -Z $EXPIRY_MAXZOOM -d $EXPIRY_MINZOOM -n 5"

BASE_DIR=/tmp
LOG_DIR=/tmp

# BASE_DIR=/var/lib/mod_tile
# LOG_DIR=/var/log/tiles/

WORKOSM_DIR=$BASE_DIR/.osmosis

LOCK_FILE=/tmp/openstreetmap-update-expire-lock.txt
CHANGE_FILE=$BASE_DIR/changes.osc.$$
EXPIRY_FILE=$BASE_DIR/dirty_tiles.$$
# EXPIRY_FILE=/home/chentoz/Downloads/dirty_tiles.$$
STOP_FILE=$BASE_DIR/stop.txt

OSMOSISLOG=$LOG_DIR/osmosis.log
PGSQLLOG=$LOG_DIR/osm2pgsql.log
EXPIRYLOG=$LOG_DIR/expiry.log
RUNLOG=$LOG_DIR/run.log

EXPIRY_MINZOOM=14
EXPIRY_MAXZOOM=20

#*************************************************************************
#*************************************************************************

m_info()
{
        echo "[`date +"%Y-%m-%d %H:%M:%S"`] $$ $1" >> "$RUNLOG"
}

m_debug()
{
        # return 0
        echo "[`date +"%Y-%m-%d %H:%M:%S"`] $$ $1" >> "$RUNLOG"
}

m_error()
{
    echo "[`date +"%Y-%m-%d %H:%M:%S"`] $$ [error] $1" >> "$RUNLOG"

    m_info "resetting state"
    # /bin/cp $WORKOSM_DIR/last.state.txt $WORKOSM_DIR/state.txt || true

    rm "$CHANGE_FILE" #|| true
    rm "$EXPIRY_FILE" #|| true
    rm "$LOCK_FILE"
    exit
}

m_ok()
{
    echo "[`date +"%Y-%m-%d %H:%M:%S"`] $$ $1" >> "$RUNLOG"
}

getlock()
{
    if [ -s $1 ]; then
        if [ "$(ps -p `cat $1` | wc -l)" -gt 1 ]; then
            return 1 #false
        fi
    fi

    echo $$ >"$1"

    rm "$CHANGE_FILE" #|| true
    rm "$EXPIRY_FILE" #|| true

    return 0 #true
}

freelock()
{
    rm "$1"
}


if [ $# -eq 1 ] ; then
    # make sure the lockfile is removed when we exit and then claim it

    if ! getlock "$LOCK_FILE"; then
        m_info "pid `cat $LOCK_FILE` still running"
        exit 3
    fi

    if [ -e $STOP_FILE ]; then
        m_info "stopped"
        exit 2
    fi

    m_info "============================= Updating : $(date -u +"%Y-%m-%d_%H:%M:%S") ============================="
    m_ok "diff openstreetmap database changes between $MIN_AGO and $NOW dates."
    m_debug "$OSMOSIS_BIN --read-apidb-change host=$PGHOST database=$PGDATABASE_EDIT  user=$PGUSER password=$PGPASS \
	    intervalBegin=$MIN_AGO intervalEnd=$NOW validateSchemaVersion=no --write-xml-change file=$CHANGE_FILE"
    if ! $OSMOSIS_BIN --read-apidb-change host="$PGHOST" database="$PGDATABASE_EDIT"  user="$PGUSER" password="$PGPASS" \
	    intervalBegin=$MIN_AGO intervalEnd=$NOW validateSchemaVersion="no" --write-xml-change file="$CHANGE_FILE" 1>&2 2> "$OSMOSISLOG" ; then
        m_error "Osmosis error"
    fi

    m_info "Change file $CHANGE_FILE, lines : $(wc -l $CHANGE_FILE | cut -f1 -d' ')"

    if [ $(grep judyzhu $CHANGE_FILE 2>/dev/null | wc -l) -le 0 ] ; then

        m_ok "importing diff"
        EXPIRY_METAZOOM=`expr $EXPIRY_MAXZOOM - 0`
        m_debug "$OSM2PGSQL_BIN -a --slim -e$EXPIRY_MINZOOM-$EXPIRY_MAXZOOM $OSM2PGSQL_OPTIONS -o "$EXPIRY_FILE" $CHANGE_FILE"
        if ! $OSM2PGSQL_BIN -a --slim -e$EXPIRY_MINZOOM-$EXPIRY_MAXZOOM $OSM2PGSQL_OPTIONS -o "$EXPIRY_FILE" $CHANGE_FILE 1>&2 2> "$PGSQLLOG" ; then
            m_error "osm2pgsql error"
        fi

        cat $EXPIRY_FILE | sort | uniq | tee -a > $EXPIRY_FILE

        m_ok "generating dirty tiles url"
        rm /tmp/render.list
        touch /tmp/render.list
        while IFS= read -r line; do
            m_info "dirty tiles : $line"
            # echo "http://localhost/$line.png" >> $(($EXPIRY_FILE)_url)
            var1=$(echo $line | cut -f1 -d/)
            var2=$(echo $line | cut -f2 -d/)
            var3=$(echo $line | cut -f3 -d/)
            echo "$var2 $var3 $var1" >> /tmp/render.list
        done < $EXPIRY_FILE

        m_ok "expiring tiles"
        if ! $RENDER_BIN $RENDER_OPTIONS < $EXPIRY_FILE 2>&1 | tail -8 >> "$EXPIRYLOG"; then
            m_info "Expiry failed"
        fi

        m_ok "Dirty tile : $EXPIRY_FILE, lines : $(wc -l $EXPIRY_FILE | cut -f1 -d' ')"
    else

        m_info "importing *delete* diff / expiry manually"
    fi

    m_info "============================= Updating Done : $(date -u +"%Y-%m-%d_%H:%M:%S") ============================="
    freelock "$LOCK_FILE"

    set > /tmp/set-output2

fi
