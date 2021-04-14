FROM python:3.6
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

WORKDIR /

COPY requirements.txt ./

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales
RUN apt-get install postgresql postgresql-contrib -y

RUN pip install --no-cache-dir -r requirements.txt

COPY .. /
WORKDIR /app
