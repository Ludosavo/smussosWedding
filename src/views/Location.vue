<template>
    <div class="titolo-con-logo">
      <img src="../assets/logo_castello.png" alt="Logo Castello" />
      <h1>Il Castello di Oviglio</h1>
    </div>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.6227387696003!2d8.484674076289313!3d44.86045777351844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47879ce36dacddd3%3A0xcf63cf8766901e09!2sCastello%20di%20Oviglio!5e1!3m2!1sit!2sit!4v1753208199142!5m2!1sit!2sit"
          width="600"
          height="450"
          style="border:0; display: flex; justify-self: center; margin: 20px; border:2px solid var(--textcolor);border-radius: 10px"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
  </iframe>
  <h2> <i class="fa-solid fa-location-dot"></i> Via XXIV Maggio, 1 · 15026 Oviglio (AL)</h2>
  <div id="testo">
  <h2 id="titolo">La Storia</h2>
  <p id="storia">
    Non si posseggono documenti storici attestanti l’esistenza del Castello prima del 1300 ma è certo che fino dal 1367, quando Oviglio cadde in potere di Galeazzo Visconti, sul posto dove ora sorge il Castello vi era un castrum ed una cinta bastionata e fortificata, chiudente anche l’antico borgo medioevale, di cui negli ovigliesi è rimasta la tradizione nel nome del cosiddetto “borgo di dentro”, ossia borgo dentro la cinta fortificata. <br><br>
    Così è certo che del castrum e del feudo di Oviglio furono dai Visconti, Duchi di Milano, investite diverse nobili famiglie tra le quali l’ultima, quella dei Perboni, lo visse per quasi cinque secoli. Il Castello di Oviglio assunse il nome, tuttora spettantegli, di Castello Reale in quanto acquistato da Sua Maestà la Regina Cristina di Borbone, nata infanta delle Due Sicilie, Augusta vedova di Re Carlo Felice.<br>
    Il castello fu successivamente di proprietà di diverse famiglie piemontesi, tra le quali i conti Perboni ed i conti Calcamuggi.<br><br>
    Furono proprio questi ultimi, durante il loro possesso, a realizzare importanti interventi di restauro e riadattamento. Fu migliorato l’aspetto dei due fianchi ad est e a sud, fu edificata l’entrata ad est e la torre che la sovrasta, fu ricostruita l’entrata ovest e restaurato il salone padronale. <br>
    E’ a loro che si devono il prezioso soffitto a cassettoni del salone dei ricevimenti e gli affreschi che adornano ancora oggi le diverse sale del piano nobile del Castello.<br> <br>
    Il 4 giugno 1908, il Ministero della Pubblica Istruzione dichiarò il Castello Reale di Oviglio monumento nazionale di interesse storico ed artistico.<br>
    A tutt’oggi resta intatto tutto il fascino di una storia lunga ben 8 secoli che gli interventi moderni hanno fregiato, facendone una dimora d’epoca dotata di tutti i comfort, di ambienti curati ed originali, di atmosfere decisamente esclusive quali quelle del suggestivo territorio del Piemonte.<br>
  </p>
  </div>
</template>

<script>
export default {
  name: "Location"
}
</script>

<style scoped>

.titolo-con-logo {
  width: 90%;
  padding: 10px;
  border-radius: 15px;
  color: var(--background);
  display: flex;
  justify-self: center;
  justify-content: center;
  background-color: rgb(71, 124, 148);
  align-items: center;
  gap: 26px;
}

.titolo-con-logo img {
  justify-content: flex-start;
  width: 200px;
  height: auto;
}

#testo{
  justify-self: center;
  background-color: var(--textcolor);
  color: var(--background);
  width: 80%;
  border-radius: 10px;
}

#titolo{
  margin: 0;
  text-align: center ;
  padding: 10px;
  border-bottom: 0;
  border-radius: 10px;
}

#storia {
  margin: 0;
  padding: 20px;
  text-align: justify;
  justify-self: center;
}
h2{
  text-align: center;
}

h2 > i {
  color: red;
}
</style>