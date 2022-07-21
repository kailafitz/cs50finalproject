FROM python:3.8-slim-buster

WORKDIR /

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_APP=app.py

ENV PYTHONPATH /

ENV PYTHONUNBUFFERED 1
EXPOSE 5001
ENTRYPOINT [ "flask"]
CMD [ "run", "--host", "0.0.0.0" ]
