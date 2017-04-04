"use strict";

var jobscript =  {};
(function(namespace) {

namespace.__split_time = function (timeString) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    if(timeString == "" || timeString == null) {
        timeString = ":";
    }

    var array = timeString.split(':');
    if(array.length == 3) {
        // assuming the case where we do not have the day
        hours = array[0];
        minutes = array[1];
        seconds = array[2];

    } else {
        return null;
    }

    return { 'hours' : hours, 'minutes' : minutes, 'seconds' : seconds };
};

namespace.__compute_time_from_string = function (timeString) {
    var time = namespace.__split_time(timeString);

    if(time != null) {
        return Number(time.hours * 60.0) + Number(time.minutes);
    }
    return null;
};

namespace.__compute_time = function (hours, minutes) {
    return Number(hours * 60.0) + Number(minutes);
};

namespace.__compose_time = function (hours, minutes) {
    if(hours == null || hours == "undefined" || hours == "") {
        hours = 0;
    }
    if(minutes == null || minutes == "undefined" || minutes == "") {
        minutes = 0;
    }
    return namespace.__pad_interger(hours) + ":" + namespace.__pad_interger(minutes) + ":00";
};

namespace.__pad_interger = function (number) {
    if (Number(number) < 10 && number != "00"
        && number != "00" && number != "01"
        && number != "02" && number != "03"
        && number != "04" && number != "05"
        && number != "06" && number != "07"
        && number != "08" && number != "09") {
        return "0" + number;
    }
    return number;
}

namespace.__unpad_interger = function (number) {
    if (Number(number) < 10 && (number == "00"
        || number == "00" || number == "01"
        || number == "02" || number == "03"
        || number == "04" || number == "05"
        || number == "06" || number == "07"
        || number == "08" || number == "09")) {
        return number[1];
    }
    return number;
}

namespace.__convert_time_string = function (timeString) {
    var time = namespace.__split_time(timeString);

    if(time != null) {
        return  namespace.__pad_interger(time.hours) + ":" + namespace.__pad_interger(time.minutes) + ":00";
    }
    return null;
};

namespace.__is_element_hidden = function (element) {
    return $(element).is(":visible");
};

namespace.__get_GUI_PropertyValue = function(element) {
    var object = $(element);
    var value = object.val();
    var isVisible = namespace.__is_element_hidden(object);

    if(isVisible == false) {
        return null;
    }
    return value;
};

namespace.__populate_initial_partition_text = function(max_tasks_per_core, max_tasks_per_node, max_cpus_per_task) {
  $('#numberTasksPerCoreText').text('Specify the number of tasks per core. Values greater than one turn hyperthreading on.');
  $('#numberOfTasksPerNodeText').text('Specify the number of tasks per node. Defines the number of MPI ranks per node. The maximum value depends on the number of cpus per task.');
  $('#numberOfCpusPerTaskText').text('Specify the number of cpus per task. Defines the number of OpenMP threads per MPI rank. The maximum value depends on the number of tasks per node.');

  if(max_tasks_per_core != null && max_tasks_per_core != "") {
    $('#numberTasksPerCoreText').append(' Maximum value: ' + max_tasks_per_core + '.');
  }

  if(max_tasks_per_node != null && max_tasks_per_node != "") {
        $('#numberOfTasksPerNodeText').append(' Current maximum: ' + max_tasks_per_node + '.');
  }

  if(max_cpus_per_task != null && max_cpus_per_task != "") {
    $('#numberOfCpusPerTaskText').append(' Current maximum: ' + max_cpus_per_task + '.');
  }
}

namespace.__populate_initial_node_text = function(max_num_nodes) {
  $('#numberOfNodesText').text('Specify the number of nodes.');

  if(max_num_nodes != null && max_num_nodes != "") {
    $('#numberOfNodesText').append(' Maximum value: ' + max_num_nodes + '.');
  }
}

namespace.__bindPrototypeMethods = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

namespace.Partition = function() {
    this.name = "partition";
    this.typeName = namespace.Partition;
    this.Partition = {
        "normal"  : "--partition=",
    };
    this.list_of_partitions = [ "normal" ];

    this.directive = "#SBATCH ";

    this.NumNodesDirective         = "--nodes=";
    this.NumGpusPerNodesDirective  = "--ntasks-per-node=";
    this.NumTasksPerNodesDirective = "--ntasks-per-node=";
    this.NumCpusPerTaskDirective   = "--cpus-per-task=";
    this.NumTasksPerCoreDirective  = "--ntasks-per-core=";
    this.MemoryDirective           = "--mem=";
    this.EMailDirective            = "--mail-user=";
    this.NameDirective             = "--job-name=";
    this.ExclusiveDirective        = "--exclusive";
    this.WallTimeDirective         = "--time=";

    this.allow_node_sharing = {};

    this.allow_hyperthreading = {};

    this.partition_website = {};

    this.pre_commands = {};
    this.default_executable = {};

    this.has_constraints = {};

    this.env_variables_ntasks = {};

    this.max_num_nodes = {
        "normal"  : 1
    };
    this.max_num_gpus = {
        "normal"  : 1
    };
    this.max_num_tasks_per_node = {
        "normal"  : 1
    };
    this.max_num_cpus_per_tasks = {
        "normal"  : 1
    };
    this.max_num_tasks_per_core = {
        "normal"  : 1
    };
    this.max_memory_per_node = {
        "normal"  : 120
    };
    this.max_wall_time = {
        "normal"  : "00:00:00"
    };
    this.default_wall_time = {
        "normal"  : "00:00:00"
    };

};

namespace.Partition.prototype.getValue = function(propertyName) {
    var value = propertyName[this.name];
    if (value == "undefined" || value == null ||  value == "") {
        return null;
    }
    return value;
};

namespace.Partition.prototype.hasHyperThreading = function() {
    var allow_hyperthreading = this.getValue(this.max_num_tasks_per_core);
    var has_hyperthreading = namespace.__get_GUI_PropertyValue('#numberTasksPerCore');
    if(has_hyperthreading == null) {
        has_hyperthreading = 1;
    }

    if(allow_hyperthreading != null && Number(allow_hyperthreading) > Number(1) && Number(has_hyperthreading) > Number(1)) {
        allow_hyperthreading = true;
    } else {
        allow_hyperthreading = false;
    }
    return allow_hyperthreading;
};


namespace.Partition.prototype.allowHyperThreading = function() {
    var allow_hyperthreading = this.getValue(this.max_num_tasks_per_core);
    if(allow_hyperthreading != null) {
        allow_hyperthreading = true;
    } else {
        allow_hyperthreading = false;
    }
    return allow_hyperthreading;
};

namespace.Partition.prototype.getMaxNumberOfThreads = function() {
    var has_hyperthreading = this.hasHyperThreading();

    var max_threads = this.getValue(this.max_num_tasks_per_node);
    var max_tasks_per_core = this.getValue(this.max_num_tasks_per_core);
    if(max_threads == null || max_threads == "") {
        max_threads = 1;
    } else if(has_hyperthreading == true) {
        if(max_tasks_per_core == null || max_tasks_per_core == "") {
            max_tasks_per_core = 1;
        }
        max_threads *= max_tasks_per_core;
    }
    return max_threads;
};

namespace.Partition.prototype.setNumTasksPerNodeAndNumCpusPerNodeValues = function (num_tasks_per_core) {
    // max tasks per node
    var tasks_per_node = this.getValue(this.max_num_tasks_per_node);
    if (tasks_per_node != null) {
        if (this.hasHyperThreading()) {
            tasks_per_node *= num_tasks_per_core;
        }
    } else {
        tasks_per_node = 1;
    }
    $('#numberOfTasksPerNode').attr({"min" : 1});
    $('#numberOfTasksPerNode').attr({"max" : tasks_per_node});
    $('#numberOfTasksPerNode').val(tasks_per_node);

    // max cpus per tasks
    var cpus_per_task = this.getValue(this.max_num_cpus_per_tasks);
    if (cpus_per_task != null) {
        cpus_per_task = Math.floor(this.getMaxNumberOfThreads() / tasks_per_node);
    } else {
        cpus_per_task = 1;
    }
    $('#numberOfCpusPerTask').attr({"min" : 1});
    $('#numberOfCpusPerTask').attr({"max" : cpus_per_task});
    $('#numberOfCpusPerTask').val(cpus_per_task);
}

namespace.Partition.prototype.updateNodesInformation = function () {
    var _self = this;
    var max_tasks_per_core = this.getValue(this.max_num_tasks_per_core);
    var tasks_per_core = namespace.__get_GUI_PropertyValue('#numberTasksPerCore');

    if (max_tasks_per_core != null) {
        if (this.allowHyperThreading() == false) {
            max_tasks_per_core = 1;
        }
    } else {
        max_tasks_per_core = 1;
    }
    var obj_tasks_per_code = $('#numberTasksPerCore');
    obj_tasks_per_code.attr({"min" : 1});
    obj_tasks_per_code.attr({"max" : max_tasks_per_core});
    if(tasks_per_core == "" || tasks_per_core == "undefined") {
        tasks_per_core = 1;
    }
    obj_tasks_per_code.val(tasks_per_core);

    this.setNumTasksPerNodeAndNumCpusPerNodeValues(tasks_per_core);

    var max_nodes = this.getValue(this.max_num_nodes);
    var obj_num_nodes = $('#numberOfNodes');
    obj_num_nodes.attr({"min" : 1});
    obj_num_nodes.attr({"max" : max_nodes});
    if(Number(obj_num_nodes.val()) > Number(obj_num_nodes.attr("max"))) {
        obj_num_nodes.val(obj_num_nodes.attr("max"));
    } else if(Number(obj_num_nodes.val()) < Number(obj_num_nodes.attr("min"))) {
        obj_num_nodes.val(obj_num_nodes.attr("min"));
    }
};

namespace.Partition.prototype.updateTimeGUI = function () {
    var target_time = this.getValue(this.default_wall_time);
    if (target_time == null) {
        $('#hours').val("0");
        $('#minutes').val("0");
    } else {
        var time = namespace.__split_time(target_time);
        $('#hours').val(namespace.__unpad_interger(time.hours));
        $('#minutes').val(namespace.__unpad_interger(time.minutes));
    }
};

namespace.Partition.prototype.hideGUIDataField = function(fieldid, fieldvalue) {
    var value = this.getValue(fieldvalue);
    if (value != null) {
        $(fieldid).show();
    } else {
        $(fieldid).hide();
    }
}

namespace.Partition.prototype.hideGUIBooleanField = function(fieldid, fieldvalue, referencevalue) {
    var value = this.getValue(fieldvalue);
    if (value != null && value == referencevalue) {
        $(fieldid).show();
    } else {
        $(fieldid).hide();
    }
}

namespace.Partition.prototype.updatePartitionsFields = function() {
    this.hideGUIBooleanField('#ExclusiveNodeGroup', this.allow_node_sharing, true);

    this.hideGUIDataField('#numberOfNodesGroup', this.max_num_nodes);
    this.hideGUIDataField('#numberTasksPerCoreGroup', this.max_num_tasks_per_core);
    this.hideGUIDataField('#numberOfTasksPerNodeGroup', this.max_num_tasks_per_node);
    this.hideGUIDataField('#numberOfCpusPerTaskGroup', this.max_num_cpus_per_tasks);
    this.hideGUIDataField('#bigMemoryGroup', this.max_memory_per_node);

    var value = this.getValue(this.default_executable);
    if (value == null) {
        $('#executableGroup').show();
    } else {
        $('#executableGroup').hide();
        $('#executable').val("");
    }
};

namespace.Partition.prototype.updateGUI = function() {
    var _self = this;

    for (var i = 0; i < _self.list_of_partitions.length; i++) {
        $('#selectPartition').append("<option>" + this.list_of_partitions[i] + "</option>");
    }

    $('#selectPartition').change(function(){
        // add here the changes when the partition changes
        __partition = new _self.typeName($(this).val());
        __partition.updatePartitionsFields();
        __partition.updateTimeGUI();
        __partition.updateNodesInformation();
        namespace.print_jobscript();
        namespace.__populate_initial_partition_text(null, null, null);
        namespace.__populate_initial_node_text(null);
    });

    // $('#numberTasksPerCore').change(function(){
    //     // add here the changes when the partition changes
    //     __partition.updateNodesInformation();
    //     namespace.print_jobscript();
    // });

    __partition.updatePartitionsFields();
    __partition.updateTimeGUI();
    __partition.updateNodesInformation();
    namespace.print_jobscript();
    namespace.__populate_initial_partition_text(null, null, null);
    namespace.__populate_initial_node_text(null);
};

namespace.Partition.prototype.printPartition = function() {
    var value = this.getValue(this.Partition);
    if (value == null) {
        return "";
    }
    return this.directive + value + this.name + "\n";
};

namespace.Partition.prototype.printConstraints = function() {
    var value = this.getValue(this.has_constraints);
    if (value == null) {
        return "";
    }
    return this.directive + value + "\n";
};

namespace.Partition.prototype.printExclusive = function() {
    var value = $('#ExclusiveNode').prop("checked");
    var max = this.getValue(this.allow_node_sharing);
    if (max != null && value == true) {
        return this.directive + this.ExclusiveDirective + "\n";
    }
    return "";
};

namespace.Partition.prototype.printNumNodes = function() {
    var value = namespace.__get_GUI_PropertyValue('#numberOfNodes');
    if(value != null) {
        if(value == "" || value == "undefined") {
            value = 1;
        }
        return this.directive + this.NumNodesDirective + value + "\n";
    }
    return "";
};

namespace.Partition.prototype.printNumTasksPerCore = function() {
    var value = namespace.__get_GUI_PropertyValue('#numberTasksPerCore');
    if(value != null) {
        if(value == "" || value == "undefined") {
            value = 1;
        }
        return this.directive + this.NumTasksPerCoreDirective + value + "\n";
    }
    return "";
};

namespace.Partition.prototype.printNumTasksPerNodes = function() {
    var value = namespace.__get_GUI_PropertyValue('#numberOfTasksPerNode');
    if(value != null) {
        if(value == "" || value == "undefined") {
            value = 1;
        }
        return this.directive + this.NumTasksPerNodesDirective + value + "\n";
    }
    return "";
};

namespace.Partition.prototype.printNumCpusPerTask = function() {
    var value = namespace.__get_GUI_PropertyValue('#numberOfCpusPerTask');
    if(value != null) {
        if(value == "" || value == "undefined") {
            value = 1;
        }
        return this.directive + this.NumCpusPerTaskDirective + value + "\n";
    }
    return "";
};

namespace.Partition.prototype.printEnvironmentVariables = function() {
    var toPrint = "";
    toPrint += "export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK\n";

    var env_variables = this.getValue(this.env_variables_ntasks);
    var ntasks = namespace.__get_GUI_PropertyValue('#numberOfTasksPerNode');

    if(env_variables != null && Number(ntasks) > 1) {
        toPrint += env_variables + "\n";
    }

    return toPrint;
};

namespace.Partition.prototype.getWallTime = function() {
    var hours = $('#hours').val();
    var minutes = $('#minutes').val();
    // var seconds = $('#seconds').val();

    var time        = namespace.__compute_time(hours, minutes);
    var time_string = namespace.__compose_time(hours, minutes);

    var max_time = this.getValue(this.max_wall_time);
    var max_time_string = namespace.__convert_time_string(max_time);
    var max_time_value = namespace.__compute_time_from_string(max_time);

    if (max_time != null && Number(time) > Number(max_time_value)) {
        time = max_time_value;
        time_string = max_time_string;
    } else if(max_time == null) {
        return "";
    }
    return this.directive + this.WallTimeDirective + time_string + "\n";
};

namespace.Partition.prototype.printMemPerNode = function() {
    var value = $('#bigMemory').prop("checked");
    var max = this.getValue(this.max_memory_per_node);
    if (max != null && value == true) {
        value = max;
    } else if(max == null || value == false) {
        return "";
    }
    return this.directive + this.MemoryDirective + value + "GB\n";
};

namespace.Partition.prototype.printExecutable = function() {
    var value = $('#executable').val();
    var max = this.getValue(this.default_executable);
    if (max != null && (value == "" || value == "undefined" || value == null)) {
        value = max;
    } else if (value == "" || value == "undefined" || value == null) {
        value = "./executable.x";
    }
    return "srun " + value;
};

namespace.Partition.prototype.printPreCommand = function() {
    var value = this.getValue(this.pre_commands);
    if (value != null && value != "" && value != "undefined") {
        return value + "\n";
    }
    return "";
};

namespace.Partition.prototype.printPartitionWebSite = function(element) {
    var website = this.getValue(this.partition_website);
    if(website != null) {
        element.innerHTML = "For more information about this queue, please refer to this <a target='_blank' href='" + website + "'>website</a>.";
    }
}

namespace.Partition.prototype.printTimeWarningMessage = function(element) {
    var hours = $('#hours').val();
    var minutes = $('#minutes').val();
    var time_string = namespace.__compose_time(hours, minutes);

    if(timeString == "00:00:00") {
        element.innerHTML += "<p>You have selected job a wall time of 00:00:00.</p>";
    }
}

namespace.Partition.prototype.printJobScriptMessage = function(element) {
    var max_num_threads = this.getMaxNumberOfThreads();

    var current_num_threads = 1;
    var arrayOfNodeInfo = [];

    var num_tasks_per_core = namespace.__get_GUI_PropertyValue('#numberTasksPerCore');
    var num_tasks_per_node = namespace.__get_GUI_PropertyValue('#numberOfTasksPerNode');
    var num_cpus_per_task = namespace.__get_GUI_PropertyValue('#numberOfCpusPerTask');

    if(num_tasks_per_core == "") {
        num_tasks_per_core = 1;
    }
    if(num_tasks_per_node == "") {
        num_tasks_per_node = 1;
    }
    if(num_cpus_per_task == "") {
        num_cpus_per_task = 1;
    }

    var has_hyperthreading = this.hasHyperThreading();


    if(num_tasks_per_core != null) {
        arrayOfNodeInfo.push('tasks per core');
    }
    if(num_tasks_per_node != null) {
        current_num_threads *= num_tasks_per_node;
        arrayOfNodeInfo.push('tasks per node');
    }
    if(num_cpus_per_task != null) {
        current_num_threads *= num_cpus_per_task;
        arrayOfNodeInfo.push('cpus per task');
    }

    var warning_state = false;
    var error_state = false;
    if(Number(current_num_threads) <= 0) {
        warning_state = false;
        error_state = true;
    } else if(Number(current_num_threads) < Number(max_num_threads)) {
        warning_state = true;
        error_state = false;
    }
    element.innerHTML = "";

    var hours = $('#hours').val();
    var minutes = $('#minutes').val();
    var time_string = namespace.__compose_time(hours, minutes);

    var time_warning = false;
    if(time_string == "00:00:00") {
        time_warning = true
    }
    var timeMsg = "<p>You have selected a wall time of 00:00:00.</p>";

    if(warning_state) {
        var alertBox = $('#jobscriptalert');
        alertBox.show();
        if(alertBox.hasClass('alert-success') == true) {
            alertBox.removeClass('alert-success');
        }
        alertBox.addClass('alert-warning');

        element.innerHTML += "<h4>Warning</h4>";
        element.innerHTML += "You have selected a ";
        if(Number(arrayOfNodeInfo.length) > 1) {
            element.innerHTML += "combination of ";
        } else {
            element.innerHTML += "number for ";
        }

        var counter = 0;
        var size = arrayOfNodeInfo.length;
        var x;
        for (x in arrayOfNodeInfo) {
            counter = Number(counter) + 1;
            element.innerHTML += '<b>' + arrayOfNodeInfo[x] + '</b>';

            if(counter == (size - 1)) {
                element.innerHTML += " and ";
            } else if(counter != size) {
                element.innerHTML += ", ";
            }
        }

        element.innerHTML += " that cannot achieve the maximum potential of the node.";
        element.innerHTML += " <p>The maximum parallel processes is <b>" + max_num_threads + "</b> but you have selected only <b>" + current_num_threads + "</b>.</p>";

        if(has_hyperthreading) {
            element.innerHTML += " <p>Note: <b>HyperThreading</b> is <b>on</b>.</p>";
        } else {
            element.innerHTML += " <p>Note: <b>HyperThreading</b> is <b>off</b>.</p>";
        }

        if(time_warning) {
            element.innerHTML += timeMsg;
        }

    } else if (current_num_threads != 1){
        var alertBox = $('#jobscriptalert');
        alertBox.show();

        if(time_warning) {
            if(alertBox.hasClass('alert-success') == true) {
                alertBox.removeClass('alert-success');
            }
            alertBox.addClass('alert-warning');

            element.innerHTML += "<h4>Warning</h4>";
        } else {
            if(alertBox.hasClass('alert-warning') == true) {
                alertBox.removeClass('alert-warning');
            }
            alertBox.addClass('alert-success');

            element.innerHTML += "<h4>Success</h4>";
        }


        element.innerHTML += "<p>For a hybrid MPI + OpenMP program you have selected: </p>";
        element.innerHTML += "<p><b>" + num_tasks_per_node + "</b> MPI rank(s) and <b>" + num_cpus_per_task + "</b> OpenMP thread(s) </p>";
        if(has_hyperthreading) {
            element.innerHTML += " <p>Note: <b>HyperThreading</b> is <b>on</b>.</p>";
        } else {
            element.innerHTML += " <p>Note: <b>HyperThreading</b> is <b>off</b>.</p>";
        }
        if(time_warning) {
            element.innerHTML += timeMsg;
        }

    } else if(time_warning){
        var alertBox = $('#jobscriptalert');
        alertBox.show();

        if(alertBox.hasClass('alert-success') == true) {
            alertBox.removeClass('alert-success');
        }
        alertBox.addClass('alert-warning');

        element.innerHTML += "<h4>Warning</h4>";
        element.innerHTML += timeMsg;
    } else {
        var alertBox = $('#jobscriptalert');
        alertBox.hide();
    }
}

namespace.Partition.prototype.printJobScript = function(element) {
    element.innerHTML  = "#!/bin/bash -l\n";

    var jobname = $('#jobName').val();
    var placeholderJobName = $('#jobName').prop("placeholder");
    if (jobname != "undefined" && jobname != null && jobname != "") {
        element.innerHTML += this.directive + this.NameDirective + jobname + "\n";
    } else if (placeholderJobName != "undefined" && placeholderJobName != null && placeholderJobName != ""){
        element.innerHTML += this.directive + this.NameDirective + placeholderJobName + "\n";
    }

    var emailAddress = $('#emailAddress').val();
    if (emailAddress != "undefined" && emailAddress != null && emailAddress != "") {
        element.innerHTML += this.directive + this.EMailDirective + emailAddress + "\n";
    }

    element.innerHTML += this.getWallTime();

    element.innerHTML += this.printNumNodes();
    element.innerHTML += this.printNumTasksPerCore();
    element.innerHTML += this.printNumTasksPerNodes();
    element.innerHTML += this.printNumCpusPerTask();
    element.innerHTML += this.printMemPerNode();
    element.innerHTML += this.printPartition();
    element.innerHTML += this.printConstraints();
    element.innerHTML += this.printExclusive();

    element.innerHTML += "\n";
    element.innerHTML += this.printEnvironmentVariables();

    element.innerHTML += "\n";
    element.innerHTML += this.printPreCommand();
    element.innerHTML += this.printExecutable();
};

namespace.Partition.prototype.print = function(jobscript, partitionWebSite, jobscriptalert) {
    this.printPartitionWebSite(partitionWebSite);
    this.printJobScriptMessage(jobscriptalert);
    this.printJobScript(jobscript);
};

namespace.DaintGPUPartition = function(name) {
    namespace.Partition.call(this);
    this.name = name;
    this.typeName = namespace.DaintGPUPartition;
    this.Partition = {
        "normal"  : "--partition=",
        "low"     : "--partition=",
        "high"    : "--partition=",
        "xfer"    : "--partition=",
        "prepost" : "--partition=",
        "debug"   : "--partition=",
    };

    this.max_wall_time = {
        "normal"  : "24:00:00",
        "low"     : "06:00:00",
        "high"    : "24:00:00",
        "xfer"    : "24:00:00",
        "prepost" : "00:30:00",
        "debug"   : "00:30:00"
    };

    this.default_wall_time = {
        "normal"  : "01:00:00",
        "low"     : "01:00:00",
        "high"    : "01:00:00",
        "xfer"    : "01:00:00",
        "prepost" : "00:30:00",
        "debug"   : "00:30:00"
    };


    this.partition_website = {
        "normal"  : "http://eth-cscs.github.io/getting_started/running_jobs/piz_daint",
        "low"     : "http://eth-cscs.github.io/getting_started/running_jobs/piz_daint",
        "high"    : "http://eth-cscs.github.io/getting_started/running_jobs/piz_daint",
        "xfer"    : "http://user.cscs.ch/storage/data_transfer/internal_transfer/index.html",
        "prepost" : "MISSING WEBSITE",
        "debug"   : "MISSING WEBSITE"
    };

    this.env_variables_ntasks = {
        "normal"  : "export CRAY_CUDA_MPS=1",
        "low"     : "export CRAY_CUDA_MPS=1",
        "high"    : "export CRAY_CUDA_MPS=1",
        "debug"   : "export CRAY_CUDA_MPS=1",
    };

    this.list_of_partitions = [ "normal", "low", "high", "xfer", "prepost", "debug" ];

    this.allow_node_sharing = {}

    this.pre_commands = {
        xfer : "module unload xalt",
    };

    this.default_executable = {
        xfer    : "rsync -av $1 $2\nif [ -n '$3' ]; then\n    sbatch --dependency=afterok:$SLURM_JOB_ID $3\nfi\n",
    };

    this.has_constraints = {
        "normal" : '--constraint=gpu',
        "low"    : '--constraint=gpu',
        "high"   : '--constraint=gpu',
        "debug"  : '--constraint=gpu',
    };

    this.max_num_nodes = {
        "normal" : 2400,
        "low"    : 2400,
        "high"   : 2400,
        "debug"  : 4
    };

    this.max_num_gpus = {
        "normal" : 1,
        "low"    : 1,
        "high"   : 1,
        "debug"  : 1
    };

    this.max_num_tasks_per_node = {
        "normal" : 12,
        "low"    : 12,
        "high"   : 12,
        "debug"  : 12
    };

    this.max_num_cpus_per_tasks = {
        "normal" : 12,
        "low"    : 12,
        "high"   : 12,
        "debug"  : 12
    };

    this.max_num_tasks_per_core = {
        "normal" : 2,
        "low"    : 2,
        "high"   : 2,
        "debug"  : 2
    };

    this.max_memory_per_node = {};
};
namespace.__bindPrototypeMethods(namespace.DaintGPUPartition, namespace.Partition);

namespace.DaintMCPartition = function(name) {
    namespace.DaintGPUPartition.call(this);
    this.name = name;
    this.typeName = namespace.DaintMCPartition;

    this.has_constraints = {
        "normal" : '--constraint=mc',
        "low"    : '--constraint=mc',
        "high"   : '--constraint=mc',
        "debug"  : '--constraint=mc'
    };

    this.max_num_tasks_per_node = {
        "normal" : 36,
        "low"    : 36,
        "high"   : 36,
        "debug"  : 36
    };

    this.max_num_cpus_per_tasks = {
        "normal" : 36,
        "low"    : 36,
        "high"   : 36,
        "debug"  : 36
    };

    this.max_num_gpus = {};

    this.env_variables_ntasks = {};

    this.max_memory_per_node = {
        "normal"  : 120
    };
};
namespace.__bindPrototypeMethods(namespace.DaintMCPartition, namespace.DaintGPUPartition);

namespace.MonchPartition = function(name) {
    namespace.Partition.call(this);
    this.name = name;
    this.typeName = namespace.MonchPartition;

    this.Partition = {
        "dphys_compute"         : "--partition=",
        "dphys_largemem"        : "--partition=",
        "dphys_largemem_wk"     : "--partition=",
        "dphys_hugemem"         : "--partition=",
        "dphys_hugemem_wk"      : "--partition=",
        "fichtner_compute"      : "--partition=",
        "parrinello_compute"    : "--partition=",
        "spaldin_compute"       : "--partition=",
        "express_compute"       : "--partition="
    };

    this.env_variables_ntasks = {};

    this.list_of_partitions = [ "dphys_compute", "dphys_largemem", "dphys_largemem_wk",
        "dphys_hugemem", "dphys_hugemem_wk", "fichtner_compute", "parrinello_compute",
        "spaldin_compute", "express_compute" ];


    this.max_wall_time = {
        "dphys_compute"         : "24:00:00",
        "dphys_largemem"        : "24:00:00",
        "dphys_largemem_wk"     : "168:00:00",
        "dphys_hugemem"         : "24:00:00",
        "dphys_hugemem_wk"      : "168:00:00",
        "fichtner_compute"      : "24:00:00",
        "parrinello_compute"    : "24:00:00",
        "spaldin_compute"       : "24:00:00",
        "express_compute"       : "02:00:00"
    };

    this.default_wall_time = {
        "dphys_compute"         : "01:00:00",
        "dphys_largemem"        : "01:00:00",
        "dphys_largemem_wk"     : "01:00:00",
        "dphys_hugemem"         : "01:00:00",
        "dphys_hugemem_wk"      : "01:00:00",
        "fichtner_compute"      : "01:00:00",
        "parrinello_compute"    : "01:00:00",
        "spaldin_compute"       : "01:00:00",
        "express_compute"       : "01:00:00"
    };

    this.partition_website = {
        "dphys_compute"         : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "dphys_largemem"        : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "dphys_largemem_wk"     : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "dphys_hugemem"         : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "dphys_hugemem_wk"      : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "fichtner_compute"      : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "parrinello_compute"    : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "spaldin_compute"       : "http://eth-cscs.github.io/getting_started/running_jobs/monch",
        "express_compute"       : "http://eth-cscs.github.io/getting_started/running_jobs/monch"
    };

    this.max_num_nodes = {
        "dphys_compute"         : "310",
        "dphys_largemem"        : "40",
        "dphys_largemem_wk"     : "12",
        "dphys_hugemem"         : "24",
        "dphys_hugemem_wk"      : "8",
        "fichtner_compute"      : "310",
        "parrinello_compute"    : "310",
        "spaldin_compute"       : "310",
        "express_compute"       : "2"
    };

    this.max_num_gpus = {};

    this.max_num_tasks_per_node = {
        "dphys_compute"         : "20",
        "dphys_largemem"        : "20",
        "dphys_largemem_wk"     : "20",
        "dphys_hugemem"         : "20",
        "dphys_hugemem_wk"      : "20",
        "fichtner_compute"      : "20",
        "parrinello_compute"    : "20",
        "spaldin_compute"       : "20",
        "express_compute"       : "20"
    };

    this.max_num_cpus_per_tasks = {
        "dphys_compute"         : "20",
        "dphys_largemem"        : "20",
        "dphys_largemem_wk"     : "20",
        "dphys_hugemem"         : "20",
        "dphys_hugemem_wk"      : "20",
        "fichtner_compute"      : "20",
        "parrinello_compute"    : "20",
        "spaldin_compute"       : "20",
        "express_compute"       : "20"
    };

    this.max_num_tasks_per_core = {
        "dphys_compute"         : "2",
        "dphys_largemem"        : "2",
        "dphys_largemem_wk"     : "2",
        "dphys_hugemem"         : "2",
        "dphys_hugemem_wk"      : "2",
        "fichtner_compute"      : "2",
        "parrinello_compute"    : "2",
        "spaldin_compute"       : "2",
        "express_compute"       : "2"
    };

    // No need to set the memory o n monch because the partition nodes already have the correct memory
    // this.has_constraints = {
    //     "dphys_largemem"        : "--mem=62GB",
    //     "dphys_largemem_wk"     : "--mem=62GB",
    //     "dphys_hugemem"         : "--mem=250GB",
    //     "dphys_hugemem_wk"      : "--mem=250GB"
    // };


};
namespace.__bindPrototypeMethods(namespace.MonchPartition, namespace.Partition);

namespace.LeonePartition = function(name) {
    namespace.Partition.call(this);
    this.name = name;
    this.typeName = namespace.LeonePartition;
    this.Partition = {
        "normal"  : "--partition=",
        "longrun" : "--partition=",
        "debug"   : "--partition="
    };
    this.list_of_partitions = [ "normal", "longrun", "debug" ];

    this.env_variables_ntasks = {};

    this.max_wall_time = {
        "normal"  : "24:00:00",
        "longrun" : "168:00:00",
        "debug"   : "00:30:00"
    };

    this.default_wall_time = {
        "normal"  : "01:00:00",
        "longrun" : "01:00:00",
        "debug"   : "00:30:00"
    };

    this.partition_website = {
        "normal"  : "http://eth-cscs.github.io/getting_started/running_jobs/monte_leone",
        "longrun" : "http://eth-cscs.github.io/getting_started/running_jobs/monte_leone",
        "debug"   : "http://eth-cscs.github.io/getting_started/running_jobs/monte_leone"
    };

    this.max_num_nodes = {
        "normal"  : "2",
        "longrun" : "2",
        "debug"   : "1"
    };

    this.max_num_gpus = {};

    this.max_num_tasks_per_node = {
        "normal"  : "16",
        "longrun" : "16",
        "debug"   : "16"
    };

    this.max_num_cpus_per_tasks = {
        "normal"  : "16",
        "longrun" : "16",
        "debug"   : "16"
    };

    this.max_num_tasks_per_core = {
        "normal"  : "2",
        "longrun" : "2",
        "debug"   : "2"
    };

    this.has_constraints = {};
};
namespace.__bindPrototypeMethods(namespace.LeonePartition, namespace.Partition);

namespace.TavePartition = function(name) {
    namespace.Partition.call(this);
    this.name = name;
    this.typeName = namespace.TavePartition;
    this.Partition = {
        normal   : "--partition=",
        largemem : "--partition="
    };
    this.list_of_partitions = [ "normal", "largemem" ];

    this.max_num_tasks_per_core = {
        "normal"   : 4,
        "largemem" : 4
    };

};
namespace.__bindPrototypeMethods(namespace.TavePartition, namespace.Partition);


var __partition = {};

namespace.__clean_fields = function () {
    document.getElementById("selectPartition").innerHTML = null;
    document.getElementById("jobscript").innerHTML = null;
}

namespace.populate_form = function () {
    __partition = new namespace.DaintGPUPartition("normal");
    __partition.updateGUI();
    namespace.print_jobscript();

    $("#selectMachine").change(function(){
        if ($(this).val() == "Daint Hybrid") {
            namespace.__clean_fields();
            __partition = new namespace.DaintGPUPartition("normal");
            __partition.updateGUI();
        } else if ($(this).val() == "Daint MultiCore") {
            namespace.__clean_fields();
            __partition = new namespace.DaintMCPartition("normal");
            __partition.updateGUI();
        } else if ($(this).val() == "Monch") {
            namespace.__clean_fields();
            __partition = new namespace.MonchPartition("dphys_compute");
            __partition.updateGUI();
        } else if ($(this).val() == "Leone") {
            namespace.__clean_fields();
            __partition = new namespace.LeonePartition("normal");
            __partition.updateGUI();
        } else if ($(this).val() == "Tave") {
            namespace.__clean_fields();
            __partition = new namespace.TavePartition("normal");
            __partition.updateGUI();
        }
    });

    var obj_num_nodes = $('#numberOfNodes');
    // on change of #numberOfNodes
    obj_num_nodes.change(function() {
        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) < Number(this.min)) {
            this.value = this.min;
        }
      namespace.__populate_initial_node_text(this.max);
      namespace.print_jobscript();
    });

    obj_num_nodes.keyup(function() {
        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) < Number(this.min) && this.value != "") {
            this.value = this.min;
        }
        namespace.__populate_initial_node_text(this.max);
        namespace.print_jobscript();
    });

//
// TASKS PER CORE
//
    var obj_tasks_per_core = $('#numberTasksPerCore');
    obj_tasks_per_core.change(function() {
        var max_tasks_per_core = __partition.getValue(__partition.max_num_tasks_per_core);

        if (max_tasks_per_core != null) {
            if (__partition.allowHyperThreading() == false) {
                max_tasks_per_core = 1;
            }
        } else {
            max_tasks_per_core = 1;
        }

        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) > Number(max_tasks_per_core)) {
            this.value = max_tasks_per_core;
        }
        else if(Number(this.value) < Number(this.min)) {
            this.value = this.min;
        }

        __partition.setNumTasksPerNodeAndNumCpusPerNodeValues(this.value);
        // $('#numberTasksPerCoreText').text('Specify the number of tasks per core. Values greater than one turn hyperthreading on.  Maximum value: ' + max_tasks_per_core + '.');

        var max_tasks_per_node = $('#numberOfTasksPerNode').attr("max");
        var max_cpus_per_task = $('#numberOfCpusPerTask').attr("max");
        // $('#numberOfTasksPerNodeText').text('Specify the number of tasks per node. Defines the number of MPI ranks per node. The maximum value depends on the number of cpus per task. Current maximum: ' + max_tasks_per_node + '.');
        // $('#numberOfCpusPerTaskText').text('Specify the number of cpus per task. Defines the number of OpenMP threads per MPI rank. The maximum value depends on the number of tasks per node. Current maximum: ' + max_cpus_per_task + '.');

        namespace.__populate_initial_partition_text(this.max, max_tasks_per_node, max_cpus_per_task);

        namespace.print_jobscript();
    });

    obj_tasks_per_core.keyup(function() {
        var max_tasks_per_core = __partition.getValue(__partition.max_num_tasks_per_core);
        if (max_tasks_per_core != null) {
            if (__partition.allowHyperThreading() == false) {
                max_tasks_per_core = 1;
            }
        } else {
            max_tasks_per_core = 1;
        }


        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) > Number(max_tasks_per_core)) {
            this.value = max_tasks_per_core;
        }
        else if(Number(this.value) <= 0 && this.value != "") {
            this.value = this.min;
        }

        var tasks_per_core = this.value;
        if(tasks_per_core == "") {
            tasks_per_core = 1;
        }


        __partition.setNumTasksPerNodeAndNumCpusPerNodeValues(tasks_per_core);
        var max_tasks_per_node = $('#numberOfTasksPerNode').attr("max");
        var max_cpus_per_task = $('#numberOfCpusPerTask').attr("max");

        namespace.__populate_initial_partition_text(this.max, max_tasks_per_node, max_cpus_per_task);

        // $('#numberTasksPerCoreText').text('Specify the number of tasks per core. Values greater than one turn hyperthreading on.  Maximum value: ' + max_tasks_per_core + '.');
        namespace.print_jobscript();
    });

//
// TASKS PER NODE
//
    var obj_tasks_per_node = $('#numberOfTasksPerNode');
    obj_tasks_per_node.change(function() {
        var max_threads = __partition.getMaxNumberOfThreads();
        var obj_num_cpus_per_task = $('#numberOfCpusPerTask');
        var num_cpus_per_task = obj_num_cpus_per_task.val();

        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) < Number(this.min)) {
            this.value = this.min;
        }

        if(num_cpus_per_task == null) {
            num_cpus_per_task = 1;
        }

        var ntasks = this.value;
        if(ntasks == "") {
            ntasks = 1;
        }

        var value_allowed_at_this_point = Math.floor(Number(max_threads) / Number(num_cpus_per_task));
        if (Number(this.value) > Number(value_allowed_at_this_point)) {
            this.max = value_allowed_at_this_point;
            this.value = value_allowed_at_this_point;
        }

        // $('#numberOfTasksPerNodeText').text('Specify the number of tasks per node. Defines the number of MPI ranks per node. The maximum value depends on the number of cpus per task. Current maximum: ' + value_allowed_at_this_point + '.');
        var max_cpus_per_task = Math.floor(Number(max_threads) / Number(ntasks));
        obj_num_cpus_per_task.attr({"max" : max_cpus_per_task});
        // $('#numberOfCpusPerTaskText').text('Specify the number of cpus per task. Defines the number of OpenMP threads per MPI rank. The maximum value depends on the number of tasks per node. Current maximum: ' + value_allowed_at_this_point + '.');

        var tasks_per_core = $('#numberTasksPerCore').attr("max");
        namespace.__populate_initial_partition_text(tasks_per_core, value_allowed_at_this_point, max_cpus_per_task);

        namespace.print_jobscript();
    });

    obj_tasks_per_node.keyup(function() {
        var max_threads = __partition.getMaxNumberOfThreads();
        var obj_num_cpus_per_task = $('#numberOfCpusPerTask');
        var num_cpus_per_task = obj_num_cpus_per_task.val();

        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) <= 0 && this.value != "") {
            this.value = this.min;
        }

        var ntasks = this.value;
        if(ntasks == "") {
            ntasks = 1;
        }

        if(num_cpus_per_task == null) {
            num_cpus_per_task = 1;
        }
        var value_allowed_at_this_point = Math.floor(Number(max_threads) / Number(num_cpus_per_task));
        if (Number(this.value) > Number(value_allowed_at_this_point)) {
            this.max = value_allowed_at_this_point;
            this.value = value_allowed_at_this_point;
        }
        // $('#numberOfTasksPerNodeText').text('Specify the number of tasks per node. Defines the number of MPI ranks per node. The maximum value depends on the number of cpus per task. Current maximum: ' + value_allowed_at_this_point + '.');
        var max_cpus_per_task = Math.floor(Number(max_threads) / Number(ntasks));
        obj_num_cpus_per_task.attr({"max" : max_cpus_per_task});
        // $('#numberOfCpusPerTaskText').text('Specify the number of cpus per task. Defines the number of OpenMP threads per MPI rank. The maximum value depends on the number of tasks per node. Current maximum: ' + value_allowed_at_this_point + '.');

        var tasks_per_core = $('#numberTasksPerCore').attr("max");
        namespace.__populate_initial_partition_text(tasks_per_core, value_allowed_at_this_point, max_cpus_per_task);

        namespace.print_jobscript();
    });

//
// CPUS PER TASK
//
    var obj_cpus_per_task = $('#numberOfCpusPerTask');
    obj_cpus_per_task.change(function() {
        var max_threads = __partition.getMaxNumberOfThreads();
        var obj_num_tasks_per_node = $('#numberOfTasksPerNode');
        var num_tasks_per_node = obj_num_tasks_per_node.val();

        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        } else if(Number(this.value) < Number(this.min)) {
            this.value = this.min;
        }

        if(num_tasks_per_node == null) {
            num_tasks_per_node = 1;
        }

        var ntasks = this.value;
        if(ntasks == "") {
            ntasks = 1;
        }

        var value_allowed_at_this_point = Math.floor(Number(max_threads) / Number(num_tasks_per_node));
        if (Number(this.value) > Number(value_allowed_at_this_point)) {
            this.max = value_allowed_at_this_point;
            this.value = value_allowed_at_this_point;
        }
        // $('#numberOfCpusPerTaskText').text('Specify the number of cpus per task. Defines the number of OpenMP threads per MPI rank. The maximum value depends on the number of tasks per node. Current maximum: ' + value_allowed_at_this_point + '.');
        var max_tasks_per_node = Math.floor(Number(max_threads) / Number(ntasks));
        obj_num_tasks_per_node.attr({"max" : max_tasks_per_node});
        // $('#numberOfTasksPerNodeText').text('Specify the number of tasks per node. Defines the number of MPI ranks per node. The maximum value depends on the number of cpus per task. Current maximum: ' + value_allowed_at_this_point + '.');

        var tasks_per_core = $('#numberTasksPerCore').attr("max");
        namespace.__populate_initial_partition_text(tasks_per_core, max_tasks_per_node, value_allowed_at_this_point);
        namespace.print_jobscript();
    });

    obj_cpus_per_task.keyup(function() {
        var max_threads = __partition.getMaxNumberOfThreads();
        var obj_num_tasks_per_node = $('#numberOfTasksPerNode');
        var num_tasks_per_node = obj_num_tasks_per_node.val();

        if(Number(this.value) > Number(this.max)) {
            this.value = this.max;
        }  else if(Number(this.value) <= 0 && this.value != "") {
            this.value = this.min;
        }

        if(num_tasks_per_node == null) {
            num_tasks_per_node = 1;
        }

        var ntasks = this.value;
        if(ntasks == "") {
            ntasks = 1;
        }

        var value_allowed_at_this_point = Math.floor(Number(max_threads) / Number(num_tasks_per_node));
        if (Number(this.value) > Number(value_allowed_at_this_point)) {
            this.max = value_allowed_at_this_point;
            this.value = value_allowed_at_this_point;
        }
        // $('#numberOfCpusPerTaskText').text('Specify the number of cpus per task. Defines the number of OpenMP threads per MPI rank. The maximum value depends on the number of tasks per node. Current maximum: ' + value_allowed_at_this_point + '.');
        var max_tasks_per_node = Math.floor(Number(max_threads) / Number(ntasks));
        obj_num_tasks_per_node.attr({"max" : max_tasks_per_node});
      // $('#numberOfTasksPerNodeText').text('Specify the number of tasks per node. Defines the number of MPI ranks per node. The maximum value depends on the number of cpus per task. Current maximum: ' + value_allowed_at_this_point + '.');

        var tasks_per_core = $('#numberTasksPerCore').attr("max");
        namespace.__populate_initial_partition_text(tasks_per_core, max_tasks_per_node, value_allowed_at_this_point);
        namespace.print_jobscript();
    });

}

namespace.print_jobscript = function() {
    document.getElementById("jobscript").innerHTML = null;
    $('#jobscriptalert').hide();
    __partition.print(document.getElementById("jobscript"), document.getElementById("partitionwebsite"), document.getElementById("jobscriptalert"));
    try {
        namespace.__highlight_code();
    } catch (msg) {
        // no need to catch
    }
    return true;
}

namespace.validate_hour = function () {
    var hours = $('#hours').val();
    var minutes = $('#minutes').val();

    var time = namespace.__compute_time(hours, minutes);

    var max_time = __partition.getValue(__partition.max_wall_time);
    var max_time_value = namespace.__compute_time_from_string(max_time);

    if (max_time != null && Number(time) > Number(max_time_value)) {
        var h = namespace.__split_time(max_time);

        time = namespace.__compute_time(h.hours, minutes);
        if(Number(time) > Number(max_time_value)) {
            $('#hours').attr({"max" : namespace.__unpad_interger(h.hours)});
            $('#hours').val(namespace.__unpad_interger(h.hours - 1));
        } else {
            $('#hours').attr({"max" : namespace.__unpad_interger(h.hours)});
            $('#hours').val(namespace.__unpad_interger(h.hours));
        }
    }
    return true;
}

namespace.validate_minutes = function() {
    var hours = $('#hours').val();
    var minutes = $('#minutes').val();

    var time = namespace.__compute_time(hours, minutes);

    var max_time = __partition.getValue(__partition.max_wall_time);
    var max_time_value = namespace.__compute_time_from_string(max_time);

    if (max_time != null && Number(time) > Number(max_time_value)) {
        var h = namespace.__split_time(max_time);
        $('#minutes').attr({"max" :namespace.__unpad_interger(h.minutes)});
        $('#minutes').val(namespace.__unpad_interger(h.minutes));
    }
    return true;
}

})(jobscript);
