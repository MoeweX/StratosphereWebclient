var maxColumnWidth = 200;
var minColumnWidth = 100;

// global variable for the currently requested plan
var pactPlanRequested = 0;

/*
 * This function toggels the child checkbox on and of, depending on the parent's state
 */
function toggleShowPlanBox(box)
{
  var child = $('#suspendJobDuringPlanCheck');
  
  if (box.is(':checked')) {
    child.attr('disabled', false);
  }
  else {
    child.attr('disabled', true);
  }
}

/*
 * Shows an error message below the upload field.
 */
function showUploadError(message)
{
  $('#upload_error_text').fadeOut("fast", function () { $('#upload_error_text')[0].innerHTML = "" + message;
                                                           $('#upload_error_text').fadeIn("slow"); } );
}

/*
 * Checks the selected file and triggers an upload, if all is correct.
 */
function processUpload()
{
  var filename = $('#upload_file_input').attr('value');
  var len = filename.length;
  if (len == 0) {
    showUploadError("Please select a file.");
  }
  else if (len > 4 && filename.substr(len - 4, len) == ".jar") {
    $('#upload_form')[0].submit();
  }
  else {
    showUploadError("Please select a .jar file.");
  }
}

/*
 * This function makes sure only one checkbox is selected.
 * Upon selection it initializes the drawing of the pact plan.
 * Upon deselection, it clears the pact plan.
 */
function toggleCheckboxes(box)
{
  if (box.is(':checked')) {
    $('.jobItemCheckbox').attr('checked', false);
    box.attr('checked', true);
    var id = box.parentsUntil('.jobListItem').parent().attr('id').substr(4);

    $('#mainCanvas').html('');
    $('#planDescription').html('');
    pactPlanRequested = id;

    $.ajax({
        type: "GET",
        url: "pactPlan",
        data: { job: id },
        success: function(response) { showPreviewPlan(response); }
    });
  }
  else {
    $('#mainCanvas').html('');
    $('#planplanDescription').html('');
  }
}

/*
 * Function that takes the returned plan and draws it.
 */
function showPreviewPlan(data)
{
  // check whether this one is still selected
  var active = $('.jobItemCheckbox:checked');
  var id = active.parentsUntil('.jobListItem').parent().attr('id').substr(4);
  
  if (pactPlanRequested == id) {
    if (data == undefined || data.jobname == undefined || data.jobname != pactPlanRequested || data.plan == undefined) {
      pactPlanRequested = 0;
    }

if(data.description != undefined) {
$('#planDescription').html(data.description);
}
    drawPactPlan(data.plan, false, "arr2.gif");
    pactPlanRequested = 0;
  }
}

/*
 * Asynchronously loads the jobs and creates a list of them.
 */
function loadJobList()
{
  $.get("jobs", { action: "list" }, createJobList);
}

/*
 * Triggers an AJAX request to delete a job.
 */
function deleteJob(id)
{
  var name = id.substr(4);
  $.get("jobs", { action: "delete", filename: name }, loadJobList);
}

/*
 * Creates and lists the returned jobs.
 */
function createJobList(data)
{
  var markup = "";
  
  var lines = data.split("\n");
  for (var i = 0; i < lines.length; i++)
  {
    if (lines[i] == null || lines[i].length == 0) {
      continue;

    }
    
    var name = null;
    var date = null;
    var tabIx = lines[i].indexOf("\t");

    if (tabIx > 0) {
      name = lines[i].substr(0, tabIx);
      if (tabIx < lines[i].length - 1) {
        date = lines[i].substr(tabIx + 1);
      }
      else {
        date = "unknown date";
      }
    }
    else {
      name = lines[i];
      date = "unknown date";
    }
    
    
    markup += '<div id="job_' + name + '" class="jobListItem"><table class="layoutTable" width="100%"><tr>';
    markup += '<td width="30px;"><input class="jobItemCheckbox" type="checkbox"></td>';
    markup += '<td><p class="jobListItemName">' + name + '</p></td>';
    markup += '<td><p class="jobListItemDate">' + date + '</p></td>';
    markup += '<td width="30px"><img class="jobItemDeleteIcon" src="img/delete-icon.png" width="24" height="24" /></td>';
    markup += '</tr></table></div>';
  }
  
  // add the contents
  $('#jobsContents').attr('innerHTML', markup);
  
  // register the event handler that triggers the delete when the delete icon is clicked
  $('.jobItemDeleteIcon').click(function () { deleteJob($(this).parentsUntil('.jobListItem').parent().attr('id')); } );
  
  // register the event handler, that ensures only one checkbox is active
  $('.jobItemCheckbox').change(function () { toggleCheckboxes($(this)) });
}

/*
 * Function that checks and launches a pact job.
 */
function runJob ()
{
   var job = $('.jobItemCheckbox:checked');
   if (job.length == 0) {
     $('#run_error_text').fadeOut("fast", function () { $('#run_error_text')[0].innerHTML = "Select a job to run.";
                                                           $('#run_error_text').fadeIn("slow"); } );
     return;
   }
   
   var jobName = job.parentsUntil('.jobListItem').parent().attr('id').substr(4);
   var showPlan = $('#showPlanCheck').is(':checked');
   var suspendPlan = $('#suspendJobDuringPlanCheck').is(':checked');
   var args = $('#commandLineArgsField').attr('value');
   
   var url = "runJob?" + $.param({ action: "submit", job: jobName, arguments: args, show_plan: showPlan, suspend: suspendPlan});
   
   window.location = url;
}

/*
 * Document initialization.
 */
$(document).ready(function ()
{
  // hide the error text sections
  $('#upload_error_text').fadeOut("fast");
  $('#run_error_text').fadeOut("fast");
  
  // register the event listener that keeps the hidden file form and the text fied in sync
  $('#upload_file_input').change(function () { $('#upload_file_name_text').attr('value', $(this).attr('value')) } );
  
  // register the event handler for the upload button
  $('#upload_submit_button').click(processUpload);
  $('#run_button').click(runJob);
  
  // register the event handler that (in)activates the plan display checkbox
  $('#showPlanCheck').change(function () { toggleShowPlanBox ($(this)); }); 
  
  // start the ajax load of the jobs
  loadJobList();
});