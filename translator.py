from flask import Flask, request, jsonify
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)  # 모든 경로에 대해 CORS 허용 및 credentials 지원

translator = Translator()

# 신조어 사전
slang_dict = {
    '어쩔티비': {'en': 'So, what?', 'ja': 'それがどうしたの？'},
    '일진': {'en': 'bully', 'ja': 'いじめっ子'},
    'ㄹㅇㅋㅋ': {'en': 'means to hahaha + acknowledge', 'ja': '笑いと認識'},
    '밀당': {'en': 'The push and pull psychological warfare of a romantic relationship', 'ja': '恋愛関係の駆け引き'},
    '알잘딱깔센': {'en': 'nailed it', 'ja': '完璧にやった'},
    '내로남불': {'en': 'double standard', 'ja': 'ダブルスタンダード'},
    '낄끼빠빠': {'en': 'In or out', 'ja': '入るか出るか'},
    '잼민이': {'en': 'I\'m a term used to ignore elementary school students who have no concept of being active on the Internet.', 'ja': 'ネット上で非常識な小学生を指す言葉'},
    '지름신': {'en': 'The impulse to splurge', 'ja': '衝動買いの神'},
    'Whyrano': {'en': 'It is an English dialect expression of ‘Wairano’, which means ‘Why are you like this?’', 'ja': '「なぜこうするの？」という方言の英訳'},
    '국뽕': {'en': 'Pride in one\'s country', 'ja': '国に対する誇り'},
    '금수저': {'en': 'He is a well-off person who was born in a family where his parents\' annual income and family environment are adequate.', 'ja': '裕福な家庭に生まれた人'},
    '급식체': {'en': 'This is one of the ways of speaking among households of teenage readers who eat lunch at school.', 'ja': '学校で給食を食べる10代の言葉の一つ'},
    '급식충': {'en': 'It is a derogatory expression for teenagers who eat school lunch during school life. Chung means bug.', 'ja': '学校で給食を食べる10代を侮辱する表現'},
    '뇌피셜': {'en': 'It means something that appears to be true when judged in one\'s own brain.', 'ja': '自分の頭で判断した時に真実のように見えることを意味する'},
    '딸바보': {'en': 'Like a fool who only knows his daughter, he is a person who loves her dearly.', 'ja': '娘しか知らないような、娘を非常に愛する人'},
    '레게노': {'en': 'Legeno: It may have the same meaning as the legend, as the wife of South Korean Internet broadcaster Woowak Jeong-dong changed \'LEGEND\' written in Minecraft\'s handle font to \'LEGENO\'.', 'ja': '伝説と同じ意味を持つかもしれない'},
    'ㅁㄴㅇㄹ': {'en': 'This means playing the basic positions of your left hand on the keyboard in order, without thinking about anything.', 'ja': '何も考えずに左手の基本位置を順に打つことを意味する'},
    '맘충': {'en': 'I am a housewife who puts my children first.', 'ja': '自分の子供を最優先する主婦'},
    '몸짱': {'en': 'That person is a person with a strong body.', 'ja': '体格の良い人'},
    '무슨 129': {'en': 'What\'s going on? It means', 'ja': '何が起こっているの？'},
    '불금': {'en': 'It is an abbreviation for ‘Burning Friday’.', 'ja': '燃える金曜日の略'},
    '버카충': {'en': 'I\'m talking about topping up bus fares.', 'ja': 'バス料金のチャージのこと'},
    '빠': {'en': 'A person who belittles someone who likes something.', 'ja': '何かを好きな人を軽蔑する人'},
    '빵셔틀': {'en': 'bread + shuttle', 'ja': 'パンの使い走り'},
    '십구만': {'en': 'It is said that when it is easy, it is 190,000.', 'ja': '簡単な時に190,000と言われる'},
    '쌉고수': {'en': 'A person who is very good at something.', 'ja': '何かが非常に上手な人'},
    '아무 말 대잔치': {'en': 'Saying meaningless words without context, without thinking, or out of embarrassment.', 'ja': '文脈なしに意味のない言葉を言うこと'},
    '월급루팡': {'en': '(Salary + Lupine the Phantom Thief): An employee who does not do any work at the company and only receives a salary.', 'ja': '会社で仕事をせずに給料だけを受け取る社員'},
    '의문의 1승': {'en': 'Unintended but victorious situation', 'ja': '意図せずに勝利した状況'},
    '진지충': {'en': 'He is a person who always acts seriously.', 'ja': '常に真剣に行動する人'},
    '짐승남': {'en': 'A man with a beast-like aura.', 'ja': '野獣のようなオーラを持つ男性'},
    '짱': {'en': 'It is used as an affix attached to the preceding word to indicate the best.', 'ja': '最高を意味する接尾辞'},
    '창렬': {'en': 'The quality is not as good as it looks.', 'ja': '見た目ほど質が良くない'},
    '충': {'en': 'It is a suffix that adds the meaning of disgust to the preceding word.', 'ja': '前の言葉に嫌悪の意味を加える接尾辞'},
    '치느님': {'en': 'A compound word of chicken + God, This means that Korean-style chicken is delicious.', 'ja': 'チキン＋神、韓国風チキンが美味しいという意味'},
    '쿠쿠루삥뽕': {'en': 'Powered by Twitch donations. The feeling of laughing while teasing the other person', 'ja': 'ツイッチのドネーションによって支えられる。相手をからかう時の笑いの感覚'},
    '킹': {'en': 'It is a word used for emphasis.', 'ja': '強調のために使われる言葉'},
    '탕진잼': {'en': '(waste + fun) It is a matter of spending a small amount of money within the range that does not interfere with daily life.', 'ja': '日常生活に支障がない範囲で小額のお金を使うこと'},
    '튀다': {'en': 'It means running away faster than running.', 'ja': '走るより早く逃げることを意味する'},
    '퐁퐁남': {'en': 'An incompetent man seduced by a woman and exploited by her.', 'ja': '女性に誘惑され、搾取される無能な男性'},
    '핵-': {'en': 'It is an affix attached to the end of a word to indicate a very strong character.', 'ja': '非常に強い性格を示す接尾辞'},
    '혈중 마라 농도': {'en': 'It is a term used to refer to blood alcohol content and how often mala dishes were consumed.', 'ja': '血中アルコール濃度と麻辣料理をどれくらい頻繁に食べたかを指す言葉'},
    '흙수저': {'en': 'A person is born into a family where it is difficult to receive financial support from parents. It is used as an antonym for gold spoon.', 'ja': '親から経済的支援を受けるのが難しい家庭に生まれた人。金のスプーンの反意語として使われる'},
    '가성비': {'en': 'The utility of price-performance ratio. It is an abbreviation for “price-performance ratio”.', 'ja': '価格対性能比の有用性'},
    '가심비': {'en': 'The utility of psychological satisfaction compared to price.', 'ja': '価格に対する心理的満足度の有用性'},
    '강퇴': {'en': 'Abbreviation for ‘forced departure’, ‘forced expulsion’. This refers to the act of forcibly expelling people from chat rooms, PC rooms, etc.', 'ja': '強制退去、強制退学の略。チャットルームやPCルームから人を強制的に追い出す行為を指す'},
    '갑분싸': {'en': 'An abbreviation for ‘the atmosphere suddenly becomes cold’.', 'ja': '突然場の雰囲気が冷たくなることの略'},
    '갑툭튀': {'en': 'It is an abbreviation for ‘to suddenly pop out’.', 'ja': '突然飛び出すことの略'},
    '남사친': {'en': 'Abbreviation for friend whose gender is male.', 'ja': '男の友達の略'},
    '넘사벽': {'en': 'A word used when you can\'t get ahead of something', 'ja': '何かに追いつけないときに使われる言葉'},
    '단짠': {'en': 'Used for foods that have both sweet and salty flavors or situations where you eat sweet and salty foods alternately.', 'ja': '甘い味と塩味の両方を持つ食べ物や、甘い食べ物と塩辛い食べ物を交互に食べる状況に使用される'},
    '듣보잡': {'en': 'A disparaging term for someone who is not well known to the public.', 'ja': '一般に知られていない人を蔑む言葉'},
    '먹튀': {'en': 'An individual or group that simply takes advantage without achieving satisfactory results. Originally, the term was used for athletes who, despite receiving a large sum of money, do not perform up to expectations in games or fail to produce results that match their compensation, disappointing fans and club officials, but its meaning has since expanded.', 'ja': '利益を得るだけで満足のいく結果を出さない個人や団体'},
    '문찐': {'en': 'It is an abbreviation for ‘cultural idiot’ and refers to a person who is slow to follow trends.', 'ja': 'トレンドに遅れる人を指す言葉'},
    '브금': {'en': 'Derived from the sound made when literally reading BGM, which is an abbreviation for background music.', 'ja': 'BGMの音をそのまま読んだものから派生した言葉'},
    '사바사': {'en': 'This means that each person reacts differently to situations.', 'ja': '人それぞれ反応が違うことを意味する'},
    '셀카': {'en': 'It means holding a camera and taking pictures of yourself, or such pictures.', 'ja': 'カメラを持って自分を撮ること、またはそのような写真を意味する'},
    '솔까말': {'en': 'If I tell you everything honestly', 'ja': '正直に言うと'},
    '스펙': {'en': 'It refers to the abilities you have accumulated.', 'ja': 'あなたが積み上げてきた能力を指す'},
    '썸': {'en': '(Some) It is an emotion exchanged before interacting with someone you have feelings for.', 'ja': '感情を持っている人と付き合う前に交わされる微妙な感情'},
    '악플': {'en': 'This is a comment with a bad meaning.', 'ja': '悪意のあるコメント'},
    '안물안궁': {'en': 'An abbreviation for “I didn’t ask, I’m not curious”', 'ja': '聞いてないし、興味ないの略'},
    '엄친아': {'en': 'It also means the son of one\'s mother\'s friend, but is also used to refer to a great person.', 'ja': '母親の友達の息子を指すが、素晴らしい人を指すこともある'},
    '여사친': {'en': 'Abbreviation for friend whose gender is male.', 'ja': '女の友達の略'},
    '열폭': {'en': 'Being overly excited and using slurs or swearing.', 'ja': '過度に興奮して侮辱や罵りをすること'},
    '용자': {'en': 'An abbreviation for a person who acts courageously', 'ja': '勇敢な行動をする人の略'},
    '움짤': {'en': 'Gif (Graphics Interchange Format)', 'ja': 'GIF画像'},
    '웃프다': {'en': 'It may seem funny on the surface, but the actual situation is sad.', 'ja': '表面上は面白そうに見えるが、実際の状況は悲しい'},
    '이왜진': {'en': 'Why is this real? abbreviation for', 'ja': 'なぜこれが本当なの？の略'},
    '이생망': {'en': 'An abbreviation for “This life is ruined.”', 'ja': 'この人生はもう終わったの略'},
    '일코': {'en': 'A person whose goal is to look like a normal person.', 'ja': '普通の人に見えることを目指す人'},
    '억까': {'en': 'criticize unfairly', 'ja': '不公平に批判すること'},
    'ㅈㄱㄴ': {'en': 'Meaning the title is the content', 'ja': 'タイトルが内容を意味する'},
    'ㅈㅅ': {'en': 'It is the initial consonant of ‘sorry’.', 'ja': '「申し訳ない」の初声'},
    '존맛탱': {'en': '(JMT)Expression used when eating very delicious food', 'ja': '非常に美味しい食べ物を食べた時の表現'},
    '지못미': {'en': 'An abbreviation for I\'m sorry for not being able to protect you', 'ja': '守れなくてごめんねの略'},
    '치맥': {'en': 'chicken + beer', 'ja': 'チキン＋ビール'},
    '차도남': {'en': 'Abbreviation for cool city man or woman', 'ja': '冷たい都会の男または女の略'},
    '카공족': {'en': 'A person who uses a cafe as a study space.', 'ja': 'カフェを学習スペースとして使用する人'},
    '케바케': {'en': 'Abbreviation for ‘case by case’', 'ja': 'ケースバイケースの略'},
    '커담': {'en': 'An abbreviation for coffee and cigarettes.', 'ja': 'コーヒーとタバコの略'},
    '텅장': {'en': 'Abbreviation for ‘empty bank account’', 'ja': '空の銀行口座の略'},
    '개이득': {'en': 'It means that have greatly benefited.', 'ja': '非常に得をしたことを意味する'},
    '광클': {'en': 'means clicking the mouse button like crazy', 'ja': '狂ったようにマウスボタンをクリックすること'},
    '다굴': {'en': 'It means that several people attack one person.', 'ja': '複数の人が一人を攻撃すること'},
    '딸피': {'en': 'This refers to when the enemy\'s HP is close to 0.', 'ja': '敵のHPがほとんど残っていない時を指す'},
    '본캐': {'en': 'This refers to the character you have managed since you first started the game, or the most important character.', 'ja': 'ゲームを始めた時から管理しているキャラクター、または最も重要なキャラクターを指す'},
    '부캐': {'en': 'alter ego', 'ja': '別のキャラクター'},
    '캐리': {'en': 'It refers to a person who led victory through outstanding performance.', 'ja': '優れたパフォーマンスで勝利を導いた人を指す'},
    '고구마': {'en': 'An expression referring to a frustrating situation or a frustrated person, such as feeling like you ate too many sweet potatoes', 'ja': '多くのさつまいもを食べたようなイライラする状況や人物を指す表現'},
    '사이다': {'en': 'It refers to a situation or person who resolved a frustrating situation in a pleasant way.', 'ja': 'イライラする状況をすっきりと解決した状況や人物を指す'},
    '먹방': {'en': 'Abbreviation for broadcast while eating', 'ja': '食べながら放送することの略'}
}


def translate_text(text, target_language):
    words = text.split()
    translated_words = []
    for word in words:
        # 신조어 사전에 있는 단어는 사전 번역 사용
        if word in slang_dict:
            translated_words.append(slang_dict[word].get(target_language, word))
        else:
            # 신조어 사전에 없는 단어는 Google Translate 사용
            translated_words.append(translator.translate(word, dest=target_language).text)
    return ' '.join(translated_words)


@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    target_language = data.get('target_language')

    # 디버그 로그 추가
    print(f"Received text to translate: {text}")
    print(f"Target language: {target_language}")

    translated_text = translate_text(text, target_language)
    print(f"Translated text: {translated_text}")
    return jsonify({'translated_text': translated_text})


if __name__ == '__main__':
    app.run()
