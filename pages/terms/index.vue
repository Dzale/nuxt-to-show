<template>
    <section class="mt80 align-left">
        <div class="container">
            

            <h1>MENTIONS LEGALES</h1>
            
            <h2>EDITION DU SITE INTERNET</h2>
            
            <p>Le site Forflyaway (ci-après "le Site"), accessible à l’adresse <a href="://forflyaway.com/terms">www.forflyaway.com/terms</a> est édité par la société Forflyaway (Ci-après dénommée "l'Editeur"), est une société par action simplifiée, dont le siège social est situé 72 Rue de Lessard 76100 ROUEN, immatriculée sous le numéro 850 074 303 R.C.S. ROUEN.</p>

            <h2>REDACTION DU SITE INTERNET</h2>
            <p>Directeur de la publication : Hélène Guilbert</p>
            <p>Contact : contact@forflyaway.com</p>

            <h2>HEBERGEUR DU SITE INTERNET</h2>
            <p>Le site Forflyaway est hébergé par OVH SAS au capital de 10 174 560 euros, dont le siège social est situé 2 rue Kellermann - 59100 Roubaix.</p>

            <h2>RESPECT DE LA PROPRIÉTÉ INTELLECTUELLE</h2>
            <p>Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo, sons, ainsi que toutes les applications informatiques qui pourraient être utilisées pour faire fonctionner le Site et plus généralement tous les éléments reproduits ou utilisés sur le Site sont protégés par les lois en vigueur au titre de la propriété intellectuelle.</p>

            <p>Ils sont la propriété pleine et entière de l'Editeur ou de ses partenaires, sauf mentions particulières. Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, y compris les applications informatiques, sans l'accord préalable et écrit de l'Editeur, sont strictement interdites. Le fait pour l'Editeur de ne pas engager de procédure dès la prise de connaissance de ces utilisations non autorisées ne vaut pas acceptation desdites utilisations et renonciation aux poursuites.</p>

            <p>Seule l'utilisation pour un usage privé dans un cercle de famille est autorisée et toute autre utilisation est constitutive de contrefaçon et/ou d'atteinte aux droits voisins, sanctionnées par Code de la propriété intellectuelle.</p>

            <p>La reprise de tout ou partie de ce contenu nécessite l'autorisation préalable de l'Editeur ou du titulaire des droits sur ce contenu.</p>

            <h2>LIENS HYPERTEXTES</h2>
            <p>Le Site peut contenir des liens hypertexte donnant accès à d'autres sites web édités et gérés par des tiers et non par l'Editeur. L'Editeur ne pourra être tenu responsable directement ou indirectement dans le cas où lesdits sites tiers ne respecteraient pas les dispositions légales.</p>
            <p>La création de liens hypertexte vers le Site ne peut être faite qu'avec l'autorisation écrite et préalable de l'Editeur.</p>
        </div>
    </section>

</template>

<script>
    export default {
        name: "mentions",
        mounted() {
            fadeOutLoader();
        },
        head() {
            return {
                title: this.$t('meta.terms.title'),
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('meta.terms.desc') },
                    { hid: 'robots', name: 'robots', content: 'noindex' }
                ]
            }
        }
    }
</script>

<style scoped>
    h1 { font-size: 2.5em; text-align: center; font-weight: bold; margin-bottom: 20px;}
    h2 { font-size: 1.2em; margin-top: 15px;}
    h3 { font-size: 1.1em; margin-top: 7px; }
    ul { list-style: circle inside none;  }
    ul li { margin: 5px; color: #878C9F;}
    b { font-weight: bold; }
</style>
