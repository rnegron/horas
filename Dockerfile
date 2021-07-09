FROM python:3.7-slim-buster as base

ENV PIP_USER=1

ENV PYTHONUNBUFFERED=1

ENV LANG en_US.UTF-8

ENV PATH="/home/appuser/.local/bin:$PATH"

RUN apt-get clean \
        && rm -rf /var/lib/apt/lists/* \
        && apt-get update -y

RUN apt-get install -y --no-install-recommends \
        build-essential \
        git

RUN useradd --create-home appuser

USER appuser


FROM base as builder

WORKDIR /tmp

RUN pip install pipenv=='2021.5.29'

COPY Pipfile Pipfile.lock /tmp/

RUN pipenv install --dev

RUN pipenv lock -r --dev > /tmp/requirements.txt


FROM base

WORKDIR /home/appuser

RUN mkdir -p static/dist && \
        mkdir -p static/public

COPY --from=builder --chown=appuser:appuser /tmp/requirements.txt /home/appuser/

RUN pip install --user -r requirements.txt

COPY --chown=appuser:appuser . .
