import csv 
import sys
from flask import Flask, request 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

class DatabaseEntry:
    def __init__(self, filename: str) -> None:
        with open(filename, 'r') as f:
            db = csv.reader(f)

            self.names = next(db)
            self.rows = list(db)
            self.name = filename.split('.')[0]
    
    def columns(self) -> list[str]:
        return self.names

    def filter(self, filters: list[str | None]) -> list[list[str]]:
        result = self.rows.copy()
        for i, filter in enumerate(filters):
            if filter:
                f: list[list[str]] = []
                for row in result:
                    print(row)
                    if row[i] == filter:
                        f.append(row)
                result = f.copy()

        return result

class Database:
    def __init__(self) -> None:
        self.entries: list[DatabaseEntry] = []

    def register(self, entry: DatabaseEntry) -> int:
        self.entries.append(entry)
        return len(self.entries) - 1

    def obtain(self, id: int) -> DatabaseEntry:
        return self.entries[id]

db = Database() 

def main(filename: str) -> None:
    db.register(DatabaseEntry(filename))
    app.run()

@app.route('/api', methods=['GET'])
@cross_origin()
def api():
    # Return a list of databases
    response = []

    for entry in db.entries:
        response.append(entry.name)

    return {'databases': response}

@app.route('/api/<id>', methods=['GET'])
@cross_origin()
def query(id):
    entry = db.obtain(int(id))

    print(request.args)

    code = request.args.get('code')
    name = request.args.get('name')
    title = request.args.get('title')
    composer = request.args.get('composer')
    arranger = request.args.get('arranger')
    publisher = request.args.get('publisher')
    grade = request.args.get('grade')
    spec = request.args.get('spec')
    entries = request.args.get('entries')
    page = request.args.get('page')

    data = entry.filter([code, name, title, composer, arranger, publisher, grade, spec])

    if entries:
        start = 0
        if page:
            start = int(page)
        
        mult = int(entries)
        start *= mult 

        end = start + mult
        
        # Check if the start exceeds the end 
        if end - 1 > len(data):
            return {'error': 'No data'}, 400  

        return {'columns': entry.names, 'data': data[start:end]}


    return {'columns': entry.names, 'data': data}


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        print("uilbackend: no .csv database provided, aborting...", file=sys.stderr)
