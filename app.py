from flask import Flask, render_template, request
from helpers import *
from datetime import datetime, timedelta


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        pid = request.form.get('portal_id')
        fax = request.form.get('fax')
        age = request.form.get('age')
        htn = request.form.get('htn')
        dm = request.form.get('dm')
        start_date = datetime.strptime(request.form.get('start_date'),'%Y-%m-%d', )
        end_date = datetime.strptime(request.form.get('end_date'),'%Y-%m-%d', )
        recert = request.form.get('s9110')
        set_up = request.form.get('s9110_U1')
        decision = request.form.get('decision')

        #TODO recieved date calculator


        dx = get_dx(htn, dm)
        procedure = get_proc(recert, set_up)
        dos = get_dos(start_date, end_date)

        exceed_auth = get_exceed_auth(start_date, end_date)
        
        #if approved
        if decision == '0':
            if exceed_auth:
                end_date = start_date + timedelta(days=179)

            final_decision_blurb = f'DOS {start_date.strftime("%m/%d/%Y")}-{end_date.strftime("%m/%d/%Y")} are approved based on Texas Medicaid Medical Policy Manual-XXX-XXXX Telemonitoring Services and SOP 111. <Initials>'
        #TODO MODIFIED DECISION BLURB
        elif decision == '1':
            pass
        #TODO PEND VERBAGE
        else:
            final_decision = 'TMHP is pending request for the following reasons: '

        comment = f'Portal ID: {pid} Fax # {fax}. Client is eligible. Duplicates/history checked. None found. Provider is eligible. Provider type 44. No current or future PDC. Submitter certification page submitted and completed. Requested {procedure} for DOS: {dos}. Client is {age} years old. The client has a qualifying condition of {dx} with at least 2 risk factors listed in policy. {exceed_auth}{final_decision_blurb}'
        print(comment)
        return render_template('index.html',comment=comment)
        
    return render_template('index.html')


@app.route('/test')
def test():
    return 'test'

if __name__ == '__main__':
    app.debug = True
    app.run()
