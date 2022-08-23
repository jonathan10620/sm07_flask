from flask import Flask, render_template, request
from helpers import *
from datetime import datetime


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

        dx = get_dx(htn, dm)
        procedure = get_proc(recert, set_up)
        dos = get_dos(start_date, end_date)

        exceed_auth = get_exceed_auth(start_date, end_date)

        if decision == '0':
            final_decision = 'DOS {accepted_dos} are approved based on '
        elif decision == '1':
            pass
        else:
            final_decision = 'TMHP is pending request for the following reasons'

        comment = f'Portal ID: {pid} Fax # {fax}. Client is eligible. Duplicates/history checked. None found. Provider is eligible. Provider type 44. No current or future PDC. Submitter certification page submitted and completed. Requested {procedure} DOS: {dos}. Client is {age if age else 0} years old. The client has a qualifying condition of {dx} with at least 2 risk factors listed in policy. {exceed_auth}{final_decision}'

        return render_template('index.html',comment=comment)
        
    return render_template('index.html')


@app.route('/test')
def test():
    return 'test'

if __name__ == '__main__':
    app.debug = True
    app.run()
