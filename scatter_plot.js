document.write('<div class="col-sm-8" id="g_1"><img id="park"></img></div>\
        <div class="col-sm-4" id="inputs_2">\
          <form id="form1">\
            <div class="form-group">\
              <h3 style="text-align: center">Fatores naturais</h3 class="text-align: center">\
              <div class="row">\
                <div class="col-6 col-md-4">\
                  <label for="input_1_vento">Vento(Km/h)</label>\
                  <input class="form-control" id="input_1_vento" placeholder="Ex: 0-12">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_1_hum">Humidade(%)</label>\
                  <input class="form-control" id="input_1_hum" placeholder="Ex: 2-22">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_1_temp">Temp(Cº)</label>\
                  <input class="form-control" id="input_1_temp" placeholder="Ex: 14-22">\
                </div>\
                \
              </div>\
              <label for="input_1_rain">Chuva(mm/m2)</label>\
              <input class="form-control" id="input_1_rain" placeholder="Ex: 14-22">\
                \
              <h3 style="text-align: center">Índices</h3>\
              <div class="row">\
                <div class="col-6 col-md-4">\
                  <label for="input_1_ffnc">FFNC</label>\
                  <input class="form-control" id="input_1_ffnc" placeholder="Ex: 20.2-56.4">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_1_dmc">DMC</label>\
                  <input class="form-control" id="input_1_dmc" placeholder="Ex: 100.4-249.7">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_1_dc">DC</label>\
                  <input class="form-control" id="input_1_dc" placeholder="Ex: 356.0-700.0">\
                </div>\
                \
              </div>\
              <label for="input_1_isi">ISI</label>\
              <input class="form-control" id="input_1_isi" placeholder="Ex: 0.0-40.1">\
              \
            </div>\
            <label for="input_1_months">Intervalo de Meses</label>\
            <input class="form-control" id="input_1_months" placeholder="Ex: jan-aug">\
            <br>\
            <button type="button" id="updatePlot" class="btn btn-primary">Pesquisar</button>\
          </form>\
        </div>\
');