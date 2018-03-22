""" General helper class """



""" Functions """
def HexToArray (color):
    """ Convert a hexadecimal rgb color saved as a String
        to an array with size 3"""
    
    # If the first char is #, cut it out
    if (color[0] == '#'):
        color = color[1:]
    # Convert the hexadecimal bytes to decimal
    r = int (color[0:2], 16);
    g = int (color[2:4], 16);
    b = int (color[4:7], 16);
    return [r,g,b];
