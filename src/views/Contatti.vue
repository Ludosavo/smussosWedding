<template>
  <table>
    <thead>
    <tr>
      <th>Ruolo</th>
      <th>Numero di telefono</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Sposa</td>
      <td>+39 3486596445</td>
    </tr>
    <tr>
      <td>Sposo</td>
      <td>+39 333 1720209</td>
    </tr>
    <tr>
      <td>Testimone (Anna)</td>
      <td>+39 3319483693</td>
    </tr>
    <tr>
      <td>Testimone (Isabel)</td>
      <td>+39 3457244224</td>
    </tr>
    <tr>
      <td>Testimone</td>
      <td>—</td>
    </tr>
    <tr>
      <td>Testimone</td>
      <td>—</td>
    </tr>
    </tbody>
  </table>

  <form></form>
</template>

<script>
export default {
  name: "Contatti"
}
</script>

<style scoped>
table {
  margin: 14rem auto;
  background-color: var(--textcolor);
  color: var(--background);
  width: 60%;
  border-radius: 10px;
  border-collapse: collapse;
}

th, td {
  border:1px solid var(--background);
  color: var(--background);
  padding: 12px 16px;
}

thead {
  text-align: center;
  font-weight: bolder;
  background-color: #04405d;
  color: #ebebd3;
}

</style>