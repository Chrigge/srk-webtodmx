""" Imports """
import array

from ola.ClientWrapper import ClientWrapper


""" Functions """
def DMXSend (inputData, universe=1):
    """ Sends inputData via DMX """
    data = array.array ('B');
    for i in inputData:
        data.append (i);
    
    global dmxWrapper
    dmxWrapper = ClientWrapper();
    dmxClient = dmxWrapper.Client();
    
    dmxClient.SendDmx (universe, data, DMXSent);
    dmxWrapper.Run();


def DMXSent (status):
    """ Gets called after DMX transmission """
    if (status.Succeeded()):
        print ("DMX data sent!");
    else:
        print ("DMX error! ", status.message);
    global dmxWrapper
    if dmxWrapper:
        dmxWrapper.Stop();
