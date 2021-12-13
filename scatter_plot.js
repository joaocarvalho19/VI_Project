document.write('<div class="col-sm-8" id="g_2"></div>\
        <div class="col-sm-4" id="inputs_2">\
          <form id="form1">\
            <div class="form-group">\
              <h3 style="text-align: center">Fatores naturais</h3 class="text-align: center">\
              <div class="row">\
                <div class="col-6 col-md-4">\
                  <label for="input_vento">Vento</label>\
                  <input class="form-control" id="input_vento" placeholder="Ex: 0-12">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_hum">Humidade</label>\
                  <input class="form-control" id="input_hum" placeholder="Ex: 2-22">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_temp">Temp</label>\
                  <input class="form-control" id="input_temp" placeholder="Ex: 14-22">\
                </div>\
                \
              </div>\
              <label for="input_chuva">Chuva</label>\
              <input class="form-control" id="input_chuva" placeholder="Ex: 14-22">\
                \
              <h3 style="text-align: center">Índices</h3>\
              <div class="row">\
                <div class="col-6 col-md-4">\
                  <label for="exampleFormControlInput1">FFNC</label>\
                  <input class="form-control" id="exampleFormControlInput1" placeholder="Ex: 20.2-56.4">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="exampleFormControlInput1">DMC</label>\
                  <input class="form-control" id="exampleFormControlInput1" placeholder="Ex: 100.4-249.7">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="exampleFormControlInput1">DC</label>\
                  <input class="form-control" id="exampleFormControlInput1" placeholder="Ex: 356.0-700.0">\
                </div>\
                \
              </div>\
              <label for="exampleFormControlInput1">ISI</label>\
              <input class="form-control" id="exampleFormControlInput1" placeholder="Ex: 0.0-40.1">\
              \
            </div>\
            <label for="exampleFormControlInput1">Intervalo de Meses</label>\
            <input class="form-control" id="exampleFormControlInput1" placeholder="Ex: jan-aug">\
            <br>\
            <button type="button" id="updatePlot" class="btn btn-primary">Pesquisar</button>\
          </form>\
        </div>\
');