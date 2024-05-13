
$(document).on('focus', '.editable', function () {
  var editElements = {};
  var id = $(this).attr('id');
  var element = $(this);
  var editor = CKEDITOR.replace(id, {
    extraPlugins: 'divarea'
  });
  console.log(id);
  editor.on('change', function () {
    editElements[id] = true;
  
  });

  editor.on('blur', function () {
    var value = editor.getData();
    saveData(element, value);
  });
});

function saveData(editor, value) {
  var id = editor.attr('id');
  if (editElements[id] !== undefined) {
    if (typeof saveChangesPopup !== 'undefined' && saveChangesPopup && !confirm('Save new changes?')) {
      alert("Changes are not saved, you can continue to edit or refresh the page.");
      return;
    }

    var content = value;
    var target = editor.data('target') || 'pages';
    editElements[id] = undefined;
    $.post("", {
      fieldname: id,
      content: content,
      target: target,
      token: token,
    })
    .done(function () {
      $("#save").show().delay(100).fadeOut();
    });
  }
}
