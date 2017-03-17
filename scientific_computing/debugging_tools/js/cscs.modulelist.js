function cscs_get_modulelist0(link, header, regex = /Scalasca\S*/gmi)
{
  cscs_read_file_contents(link, function __populate_site_content(argument) {
    var pattern = regex;
    var parsed_module = "";
  
    var result = pattern.exec(argument);
    while (result) {
      var holder = result + '';
      holder = holder.replace('.eb', '');
      var splitter = holder.split('-');
      holder = "";
      cat = '-';
      for (var i = 0; i < splitter.length; i++) {
        if(i == 0) {
          cat = '/';
        } else if(i == splitter.length -1){
          cat = '';
        } else {
          cat = '-';
        }
        holder += splitter[i] + cat;
      }
      parsed_module += holder + '\n';
      result = pattern.exec(argument);
    }
    document.getElementById("cscs-markdown-content").innerHTML += header + '<pre>' + parsed_module + '</pre>';
  });
}

