FROM python:3.7

ENV PYTHONUNBUFFERED 1

COPY ./requirements /project/requirements
RUN pip3 install -r /project/requirements/base.txt

COPY . /project

WORKDIR /project
