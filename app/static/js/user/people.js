(function(){
  'use strict';

  $(document).ready(function(){
    $('tbody#p .delete').on('click', delPerson);
  });

  function delPerson(){
    debugger;
    var id = $(this).closest('tr').attr('data-person-id'),
        type = 'delete',
        url = '/people/' + id;

    $.ajax({url:url, type: type, dataType: 'json', success: function(data){
      var $person = $('tr[data-person-id='+data.id+']');
      $person.fadeOut();

      setTimeout(function(){$person.remove();}, 1000);
    }});
  }



})();
