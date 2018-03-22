""" Imports """
import array;
import pickle;


""" Functionality """
universe = 1;                   # DMX universe
dmx = [0]*512;        # DMX value array
dmxReservations = [0]*512   # DMX reservation array
devices = list();               # List of all devices
currentDid = 0;                 # ID to be applied to the next added device

def AddDevice (device):
    """ Add a device to the device list """
    global currentDid;
    device.did = currentDid;
    currentDid += 1;         # Set the device ID
    devices.append (device);
    for i in range (0, device.length):
        dmxReservations[device.address + i] = device.did;     # Update the DMX array
    print ("Added device %s" % device.did);


def RemoveDevice (did):
    """ Removes a device via it's device ID. """
    device = getDevice (did);
    for i in range (device.length):
        dmxReservations[device.address + i] = 0;
        devices.remove (device);


def GetDevice (did):
    """ Get a device from the list by it's did """
    for device in devices:
        if (device.did == did):
            print ("GetDevice: Found device");
            return device;
    print ("GetDevice: No device found");
    return None;

def UpdateDevice (did, values):
    device = GetDevice (did);
    # Cycle through the values so mismatched value array size doesn't mess up everything
    if (device != None):
        print ("Updated device %s" % did);
        for i in range (0, device.length):
            device.values[i] = values[i];
    else:
        print ("Tried to update device %s, but there is no such device" % did);
        for device in devices:
            print ("Devices: ", device.did);


def UpdateDMXArray():
    """ Updates the DMX array with values according to the device list """
    for device in devices:
        for i in range (device.length):
            dmx [device.address + i] = device.values[i];
            

def GetDMXArray():
    """ Returns the array of dmx values. """
    UpdateDMXArray();
    dmxArray = array.array('i');
    for i in dmx:
        dmxArray.append(i);
    return dmx;

def PrintReservations():
    print ("Reservations (channel, ID):");
    for i in range (0, len (dmxReservations)):
        if (dmxReservations[i] != 0):
            print (i, dmxReservations[i])
