from fastapi import FastAPI , Query
import MySQLdb
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#เชื่อมต่อ 
def db_connect():
    connect = MySQLdb.connect(
        host="localhost",
        user="root",
        password="0909804595za",
        database="database"
    )
    return connect

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#บันทึกข้อมูล
class Subject(BaseModel):
    id:int
    name: str
    subID: int

@app.post('/insertsubject')
def insert(values: Subject):

    cursor = db_connect().cursor()
    cursor.execute("INSERT INTO table_subject (user_id,subject_name, subject_id) VALUES (%s, %s, %s)", 
                    (values.id, values.name, values.subID))
    cursor.connection.commit()
    return {"message": "Successful"}

class Signup(BaseModel):
    userid:str
    username: str
    password: str

@app.post('/signup')
def insert(values: Signup):
    cursor = db_connect().cursor()
    cursor.execute("INSERT INTO table_user (user_id,username, password) VALUES (%s, %s, %s)", 
                    (values.userid, values.username, values.password))
    cursor.connection.commit()
    return {"message": "Successful"}

class totoaldata(BaseModel):
    userid:int
    subject_id:int
    subject_name:str
    subjectAssignment:str
    scoreAssignment:int
    myScore:int

@app.post('/totaldata')
def insert(values: totoaldata):
    cursor = db_connect().cursor()
    cursor.execute("INSERT INTO table_database (user_id,subject_id,subject_name,subject_assignment,score_assignment,my_score) VALUES (%s, %s, %s,%s, %s, %s)", 
                    (values.userid, values.subject_id, values.subject_name , values.subjectAssignment , values.scoreAssignment , values.myScore))
    cursor.connection.commit()


#อัพเดทข้อมูล
class update(BaseModel):
    newmyscore : int
    userid:int
    subjectAssignment:str
    
@app.put('/updatedata')
def update_data(values: update):
    cursor = db_connect().cursor()
    cursor.execute("""UPDATE table_database SET  my_score = %s WHERE user_id = %s AND subject_assignment = %s """, 
    (values.newmyscore))
    cursor.connection.commit()

#login
class LoginRequest(BaseModel):
    username_login: str
    password_login: str

@app.post('/login')
def login(request: LoginRequest):
    connection = db_connect()
    cursor = connection.cursor()
    
    cursor.execute("SELECT username, password FROM table_user WHERE username = %s", (request.username_login,))
    user = cursor.fetchone()
    
    cursor.close()
    connection.close()

    if user and user[1] == request.password_login:
        print("OK")
        return {"message": "Login successful", "user_id": user[0], "username": user[1]}
    else:
        print("No")

#ดึงข้อมูล
class Search(BaseModel):
    search: str
@app.post("/data")
def get_data_from_db(search: Search):
    connection = db_connect()
    cursor = connection.cursor()
    cursor.execute(
        "SELECT id, subject_name, subject_assignment, score_assignment, my_score FROM table_database WHERE subject_name LIKE %s",
        ('%' + search.search + '%',)
    )

    rows = cursor.fetchall()

    columns = [col[0] for col in cursor.description]
    
    data = []
    for row in rows:
        row_data = {}
        for column, value in zip(columns, row):
            row_data[column] = value
        data.append(row_data)
    cursor.close()
    connection.close()
 
    def all_subject():
        subject = [""]
        connection = db_connect()
        cursor = connection.cursor()
        cursor.execute(
            "SELECT id, subject_name FROM table_database"
        )
        rows = cursor.fetchall()

        columns = [col[0] for col in cursor.description]

        allsubject = []
        for row in rows:
            row_data = {}
            for column, value in zip(columns, row):
                row_data[column] = value
            allsubject.append(row_data)
        for key in allsubject:
            if key["subject_name"] not in subject:
                subject.append(key["subject_name"])
        return subject

    total_myscore = 0
    total_score_assignment = 0
    result = ""

    total_result = []
    for key in data:
        total_myscore += int(key["my_score"])
        total_score_assignment += int(key["score_assignment"])
        
    if total_myscore >= 80:
        result = "A"
        total_result.append(4.00)
    elif total_myscore >=75:
        result = "B+"
        total_result.append(3.50)
    elif total_myscore >=70:
        result = "B"
        total_result.append(3.00)
    elif total_myscore >=65:
        result = "C+"
        total_result.append(2.50)
    elif total_myscore >=60:
        result = "C"
        total_result.append(2.00)
    elif total_myscore >=55:
        result = "D+"
        total_result.append(1.50)
    elif total_myscore >=50:
        result = "D"
        total_result.append(1.00)
    else:
        result = "F"
        total_result.append(0)

    if sum(total_result)/len(all_subject()) <2.00:
        tenor = "ติดโปร"
    else:
        tenor = ""
    data.append({"total_s":total_myscore , "total_a":total_score_assignment , "result":result ,"total_result":f"{sum(total_result)/len(all_subject()):.2f}","tenor":tenor})
    return {"data": data}

#ตัวเทส
#data = [
#    {"id": "101", "subject_assignment": "Midterm", "score_assignment": "20", "my_score": "18"},
#    {"id": "102", "subject_assignment": "Final", "score_assignment": "30", "my_score": "25"},
#   {"id": "103", "subject_assignment": "เข้าเรียน", "score_assignment": "10", "my_score": "10"}
#]
#total_myscore = 0
#total_score_assignment = 0
#result = ""
#total_result = []
#for key in data:
#        total_myscore += int(key["my_score"])
#        total_score_assignment += int(key["score_assignment"])
#if total_myscore >= 80:
#        result = "A"
#        total_result.append(4.00)
#elif total_myscore >=75:
#        result = "B+"
#       total_result.append(3.50)
#elif total_myscore >=70:
#       result = "B"
#      total_result.append(3.00)
#elif total_myscore >=65:
#        result = "C+"
#        total_result.append(2.50)
#elif total_myscore >=60:
#        result = "C"
#        total_result.append(2.00)
#elif total_myscore >=55:
#    result = "D+"
#    total_result.append(1.50)
#elif total_myscore >=50:
#    result = "D"
#    total_result.append(1.00)
#else:
#    result = "F"
#    total_result.append(0)
#if sum(total_result)/len(total_result) <2.00:
#    tenor = "ติดโปร"
#else:
#    tenor = ""
#data.append({"total_s":total_myscore , "total_a":total_score_assignment , "result":result ,"total_result":sum(total_result)/len(total_result),"tenor":tenor})
#print(data)
#print(data)

#@app.get("/data")
#def read_data():
#   data = get_data_from_db(request: Search)
 #   return {"data": data}

#uvicorn main:app --reload
#python -m uvicorn main:app --reload