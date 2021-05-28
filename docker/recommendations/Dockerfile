FROM python:3.8
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY internal/alg/recommend_articles_for_user.py .
CMD ["bash"]