BDIR=bin
APP=$(BDIR)/hellomake

#IDIR=../include
IDIR=.
CC=gcc
CFLAGS=-I$(IDIR)

ODIR=obj
#ODIR=.

LDIR=../lib

LIBS=-lm

_DEPS=hellomake.h
DEPS=$(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ=hellomake.o hellofunc.o
OBJ=$(patsubst %,$(ODIR)/%,$(_OBJ))
#$(info OBJ is $(OBJ))

$(ODIR)/%.o: %.c $(DEPS)
	$(info #1 Command is : $(CC) -c -o $@ $< $(CFLAGS))
	$(CC) -c -o $@ $< $(CFLAGS)

# $(DEPS): | $(IDIR)

# $(IDIR):
#	mkdir $(IDIR)

$(APP):$(OBJ) | $(BDIR)
	$(info #2 Command is : $(CC) -o $@ $^ $(CFLAGS) $(LIBS))
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

$(BDIR):
	mkdir $(BDIR)

# all: $(OBJS)
$(OBJ): | $(ODIR)

$(ODIR):
	mkdir $(ODIR)

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~ $(APP) *.o 

cleanall:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~ $(APP) *.o 
	rm -rf $(BDIR) $(ODIR)