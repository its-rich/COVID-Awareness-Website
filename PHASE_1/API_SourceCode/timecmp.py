import re
def isBefore(time1, time2):
    time1 = re.sub('x','9',time1)
    time2 = re.sub('x','9',time2)
    print(time1,time2)
    #requires both times to be in the format DD-MM-YYYY_HH:MM:SS
    #returns true if time1 is before or equal to time2
    #splitting the date and the time
    stime1 = time1.split('_')
    stime2 = time2.split('_')
    #splitting the date into DD-MM-YYYY
    date1 = stime1[0].split('-')
    date2 = stime2[0].split('-')
    #Splitting the time into HH:MM:SS
    day1 = stime1[1].split(':')
    day2 = stime2[1].split(':')
    #Finding if time1 is before time2
    if (int(date1[2]) < int(date2[2])):
        return True
    if (date1[2] == date2[2]):
    
        if (int(date1[1]) < int(date2[1])):
            return True
        if (date1[1] == date2[1]):
        
            if (int(date1[0]) < int(date2[0])):
                return True
            if (date1[0] == date2[0]):
            
                if (int(day1[0]) < int( day2[0])):
                    return True
                if (day1[0] == day2[0]):
                
                    if (int(day1[1]) < int(day2[1])):
                        return True
                    if (day1[1] == day2[1]):
                    
                        if (int(day1[2]) <= int(day2[2])):
                            return True
                        else:
                            return False
    return False
                            
def isAfter(time1, time2):
    re.sub('x','9',time1)
    re.sub('x','9',time2)
    #requires both times to be in the format DD-MM-YYYY_HH:MM:SS
    #Returns true if time1 is after or equal to time2
    #splitting the date and the time
    stime1 = time1.split('_')
    stime2 = time2.split('_')
    #splitting the date into DD-MM-YYYY
    date1 = stime1[0].split('-')
    date2 = stime2[0].split('-')
    #Splitting the time into HH:MM:SS
    day1 = stime1[1].split(':')
    day2 = stime2[1].split(':')
    #Finding if time1 is after time2
    if (int(date1[2]) > int(date2[2])):
        return True
    if (date1[2] == date2[2]):
    
        if (int(date1[1]) > int(date2[1])):
            return True
        if (date1[1] == date2[1]):
        
            if (int(date1[0]) > int(date2[0])):
                return True
            if (date1[0] == date2[0]):
            
                if (int(day1[0]) > int( day2[0])):
                    return True
                if (day1[0] == day2[0]):
                
                    if (int(day1[1]) > int(day2[1])):
                        return True
                    if (day1[1] == day2[1]):
                    
                        if (int(day1[2]) >= int(day2[2])):
                            return True
                        else:
                            return False
    return False
    
    
