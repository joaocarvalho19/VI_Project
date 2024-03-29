document.write('<div class="col-sm-8" id="g_1"><img id="park"></img></div>\
        <div class="col-sm-4" id="inputs_2">\
          <form id="form1">\
            <div class="form-group">\
              <h3 style="text-align: center">Natural factors</h3 class="text-align: center">\
              <div class="row">\
                <div class="col-6 col-md-4">\
                  <label for="input_1_wind">Wind(Km/h)</label>\
                  <input class="form-control" id="input_1_wind" placeholder="Ex: 0-12">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_1_hum">RH(%)</label>\
                  <input class="form-control" id="input_1_hum" placeholder="Ex: 2-22">\
                </div>\
                <div class="col-6 col-md-4">\
                  <label for="input_1_temp">Temp(Cº)</label>\
                  <input class="form-control" id="input_1_temp" placeholder="Ex: 14-22">\
                </div>\
                \
              </div>\
              <label for="input_1_rain">Rain(mm/m2)</label>\
              <input class="form-control" id="input_1_rain" placeholder="Ex: 0-2.3">\
                \
              <h3 style="text-align: center">Indexes</h3>\
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
            <h3 style="text-align: center">Months Interval</h3>\
            <div class="row">\
              <div class="col-6 col-md-6">\
                <label for="input_1_months1" class="form-label">First</label>\
                <input class="form-control" list="months_1_Data1" id="input_1_months1" placeholder="Type first month...">\
                <datalist id="months_1_Data1">\
                  <option value="January">\
                  <option value="February">\
                  <option value="March">\
                  <option value="April">\
                  <option value="May">\
                  <option value="June">\
                  <option value="July">\
                  <option value="August">\
                  <option value="September">\
                  <option value="October">\
                  <option value="November">\
                  <option value="December">\
                </datalist>\
              </div>\
              <div class="col-6 col-md-6">\
                <label for="input_1_months2" class="form-label">Last</label>\
                <input class="form-control" list="months_1_Data2" id="input_1_months2" placeholder="Type last month...">\
                <datalist id="months_1_Data2">\
                  <option value="January">\
                  <option value="February">\
                  <option value="March">\
                  <option value="April">\
                  <option value="May">\
                  <option value="June">\
                  <option value="July">\
                  <option value="August">\
                  <option value="September">\
                  <option value="October">\
                  <option value="November">\
                  <option value="December">\
                </datalist>\
              </div>\
              </div>\
            <button type="button" id="updatePlot" class="btn btn-primary">Pesquisar</button>\
          </form>\
        </div>\
');