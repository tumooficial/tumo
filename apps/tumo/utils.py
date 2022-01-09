from django.conf import settings
from django.templatetags.static import static


def get_msg_erro(form, show_nome_campo = True):
    erro_msg = ''
    for field in form:
        if field.errors:
            for i, erro in enumerate(field.errors):
                if i == 0:
                    return f'Erro no campo "{field.label}": {erro}' if show_nome_campo else erro

    return erro_msg

def base_context(page = ''):
    return {
        'debug_status': not settings.DEBUG,
        'metatags': {
            'title': set_title(page),
            'description': set_description(page),
            'keywords': set_keywords(page),
            'image_src': get_image_src()
        }
    }

def set_title(page):
    titles_func = {
        'tumo-home': title_default(),
    }

    if page in titles_func:
        return titles_func[page]
    else:
        return title_default()

def set_description(page):
    descrs_func = {
        'tumo-home': description_default(),
    }

    if page in descrs_func:
        return descrs_func[page]
    else:
        return description_default()

def set_keywords(page):
    keywords_func = {
        'tumo-home': keywords_default(),
    }

    if page in keywords_func:
        return keywords_func[page]
    else:
        return keywords_default()

def get_image_src():
    return static('tumo/img/tumo-bg-home.jpg')

def title_default():
    return 'Soluções em software para o seu negócio | Tumo'

def description_default():
    return """
    Criação de soluções em software para o seu negócio. Primeiro fazemos uma imersão para termos o máximo de entendimento do seu negócio.
    Em seguida realizamos o planejamento da solução. E o último passo e mais esperado é a execução, a criação, desenvolvimento e lançamento
    da solução planejada.
    """ 

def keywords_default():
    return """
    soluções em software, desenvolvimento, tecnologia, sistema, solução de negócio, análise, criação, planejamento,
    """.replace('\n', '')