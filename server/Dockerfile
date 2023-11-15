FROM python:3.9-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
  g++

WORKDIR /code

COPY ./requirements.txt ./requirements.txt

RUN pip3 install --upgrade pip setuptools && pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]