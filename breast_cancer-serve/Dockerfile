# base image
FROM python:3.9

# set working directory
WORKDIR /app

# copy files
COPY app.py /app
COPY requirements.txt /app
COPY model /app/model
COPY microservice /app/microservice

# install dependencies
RUN pip install -r requirements.txt

# run application
EXPOSE 8000
ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:8000", "--access-logfile", "-", "--error-logfile", "-", "--timeout", "120"]
CMD ["app:app"]