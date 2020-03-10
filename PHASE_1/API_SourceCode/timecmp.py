import re
def isBefore(time1, time2):
    #replacing all x's with 0 as it is assumed that any missing dates are the lowest possible values, as it should return false if it is ambiguous which date came first
    time1 = re.sub('x','0',time1)
    time2 = re.sub('x','0',time2)
    #splitting the times into months,days,hours,etc
    time1 = re.split('\:|\-|T', time1)
    time2 = re.split('\:|\-|T', time2)
    
    #Finding if time1 is before time2
    if (int(time1[0]) < int(time2[0])):
        return True
    if (time1[0] == time2[0]):
    
        if (int(time1[1]) < int(time2[1])):
            return True
        if (time1[1] == time2[1]):
        
            if (int(time1[2]) < int(time2[2])):
                return True
            if (time1[2] == time2[2]):
            
                if (int(time1[3]) < int( time2[3])):
                    return True
                if (time1[3] == time2[3]):
                
                    if (int(time1[4]) < int(time2[4])):
                        return True
                    if (time1[4] == time2[4]):
                    
                        if (int(time1[5]) <= int(time2[5])):
                            return True
                        else:
                            return False
    return False
                            
def isAfter(time1, time2):
    #replacing all x's with 9 as it is assumed that any missing dates are the highest possible values, as it should return false if it is ambiguous which date came first
    time1 = re.sub('x','9',time1)
    time2 = re.sub('x','9',time2)
    #splitting the times into months,days,hours,etc
    time1 = re.split('\:|\-|T', time1)
    time2 = re.split('\:|\-|T', time2)
    
    #Finding if time1 is after time2
    if (int(time1[0]) > int(time2[0])):
        return True
    if (time1[0] == time2[0]):
    
        if (int(time1[1]) > int(time2[1])):
            return True
        if (time1[1] == time2[1]):
        
            if (int(time1[2]) > int(time2[2])):
                return True
            if (time1[2] == time2[2]):
            
                if (int(time1[3]) > int( time2[3])):
                    return True
                if (time1[3] == time2[3]):
                
                    if (int(time1[4]) > int(time2[4])):
                        return True
                    if (time1[4] == time2[4]):
                    
                        if (int(time1[5]) >= int(time2[5])):
                            return True
                        else:
                            return False
    return False
                            
    
