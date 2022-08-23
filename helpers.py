def get_dx(htn, dm):
    if htn and dm:
        dx = 'Hypertension and Diabetes'
    elif htn:
        dx = 'Hypertension'
    else:
        dx = 'Diabetes'
    return dx

def get_proc(recert, set_up):
    if recert and set_up:
        proc = 'S9110-U1 and S9110'
    elif recert:
        proc = 'S9110'
    else:
        proc = 'S9110-U1'
    return proc

def get_dos(start_date, end_date):
    return f"{start_date.strftime('%m/%d/%y')}-{end_date.strftime('%m/%d/%y')}"

def get_exceed_auth(st,end):
    delta = end - st
    if delta.days + 1 > 180:
        return 'The dates requested have been modified because the request exceeds the standard authorization period for this service. '
    return ''

