# !/bin/bash
set -e

PATH=/home/chentoz/Downloads/local-osmosis/bin:/usr/local/go/bin:/home/chentoz/Downloads/local-osmosis/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/chentoz/go/bin:/home/chentoz/go/bin

DEBUG=off

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
OSM2PGSQL_OPTIONS="-v -d $PGDATABASE_RENDER -G --hstore-all -r xml --tag-transform-script /home/chentoz/Downloads/openstreetmap-carto/openstreetmap-carto.lua -C 9999 --number-processes 5 -S /home/chentoz/Downloads/openstreetmap-carto/openstreetmap-carto.style"

RENDER_BIN=/usr/local/bin/render_expired
RENDER_OPTIONS="-m $MAPSTYLE -z $EXPIRY_MINZOOM -Z $EXPIRY_MAXZOOM -n 10"

EXPIRE_BIN="ruby /home/chentoz/Downloads/tile_expiry/update.rb"
EXPIRE_OPTIONS=

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

EXPIRY_MINZOOM=16
EXPIRY_MAXZOOM=19

m_info()
{
        echo "[`date +"%Y-%m-%d %H:%M:%S"`] $$ $1" >> "$RUNLOG"
}

m_debug()
{
        if [ "$DEBUG" = "on" ] ; then
            echo "[`date +"%Y-%m-%d %H:%M:%S"`] $$ $1" >> "$RUNLOG"
        fi
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

    m_info "============================= Updating : $(date +"%Y-%m-%d_%H:%M:%S") ============================="
    m_ok "gis edit changes between $MIN_AGO and $NOW"
    m_debug "$OSMOSIS_BIN --read-apidb-change host=$PGHOST database=$PGDATABASE_EDIT  user=$PGUSER password=$PGPASS \
	    intervalBegin=$MIN_AGO intervalEnd=$NOW validateSchemaVersion=no --write-xml-change file=$CHANGE_FILE"
    if ! $OSMOSIS_BIN --read-apidb-change host="$PGHOST" database="$PGDATABASE_EDIT"  user="$PGUSER" password="$PGPASS" \
	    intervalBegin=$MIN_AGO intervalEnd=$NOW validateSchemaVersion="no" --write-xml-change file="$CHANGE_FILE" 1>&2 2> "$OSMOSISLOG" ; then
        m_error "Osmosis error"
    fi
    m_info "Change file $CHANGE_FILE, lines : $(wc -l $CHANGE_FILE | cut -f1 -d' ')"

    m_ok "updating render database : ${PGDATABASE_RENDER}"
    m_debug "$OSM2PGSQL_BIN -a --slim $OSM2PGSQL_OPTIONS -e$EXPIRY_MINZOOM-$EXPIRY_MAXZOOM -o "$EXPIRY_FILE" $CHANGE_FILE"
    if ! $OSM2PGSQL_BIN -a --slim $OSM2PGSQL_OPTIONS -e$EXPIRY_MINZOOM-$EXPIRY_MAXZOOM -o "$EXPIRY_FILE" $CHANGE_FILE; then
        m_error "osm2pgsql error"
    fi

    cat $EXPIRY_FILE | sort | uniq | tee -a > $EXPIRY_FILE
    m_ok "Dirty tiles (Add/Modity) : $EXPIRY_FILE, lines : $(wc -l $EXPIRY_FILE | cut -f1 -d' ')"

    # m_ok "generating dirty tiles url"
    # rm /tmp/render.list
    # touch /tmp/render.list
    # while IFS= read -r line; do
        #m_info "dirty tiles : $line"
        # echo "http://localhost/$line.png" >> $(($EXPIRY_FILE)_url)
        #var1=$(echo $line | cut -f1 -d/)
        #var2=$(echo $line | cut -f2 -d/)
        #var3=$(echo $line | cut -f3 -d/)
        #echo "$var2 $var3 $var1" >> /tmp/render.list
    #done < $EXPIRY_FILE

    m_ok "expiring tiles : using expired list"
    if ! $RENDER_BIN $RENDER_OPTIONS<$EXPIRY_FILE ; then
        m_info "render_expired expiry failed"
    fi

    m_ok "expiring tiles : using with larger zoom"
    if ! $EXPIRE_BIN $EXPIRE_OPTIONS $CHANGE_FILE ; then
        m_info "expire.rb expiry failed"
    fi

    m_info "============================= Updating Done : $(date +"%Y-%m-%d_%H:%M:%S") ============================="
    freelock "$LOCK_FILE"

fi
