from flask import Flask, request, jsonify
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)  # 모든 경로에 대해 CORS 허용 및 credentials 지원

translator = Translator()

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    target_language = data.get('target_language')

    # 디버그 로그 추가
    print(f"Received text to translate: {text}")
    print(f"Target language: {target_language}")

    translation = translator.translate(text, dest=target_language)
    print(f"Translated text: {translation.text}")
    return jsonify({'translated_text': translation.text})

if __name__ == '__main__':
    app.run()
