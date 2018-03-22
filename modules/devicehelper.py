""" Imports """
import json

import devicemanager

class Device:
    """ """
    def __init__ (self, filename, address):
        """ Loads a device using a device config-file """
        try:
            data = json.load (open (filename));
        except IOError:
            print ("Could not read file!");
        with data:
            self.name = data["name"];
            self.length= data["length"];    # Amount of DMX channels reserved
            self.channels=data["channels"]; # Channel information
        self.address = address;
        self.did = devicemanager.AddDevice (self);    # did = device id
        self.values = [0] * len (self.channels);# DMX values
    
    def __init__ (self, address, length, channels, name="Unnamed"):
        self.name = name;
        self.address = address;
        self.length = length;
        self.channels = channels;
        self.did = devicemanager.AddDevice (self);
        self.values = [0] * len (self.channels);
    
    
    def __str__ (self):
        return (self.name + " @ " + self.address + " -> " +
            (self.address+self.length))
