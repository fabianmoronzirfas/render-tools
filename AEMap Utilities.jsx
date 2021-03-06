{
  /*
   * AEMap Utilities.jsx
   * These are some usefull functions. not only for Maps
   * Version 0.2 UI Skeleton
   * An After Effetcs CS5 Dockable Scripts Panel for Mercator Map Creation
   * Copyright (c)  2012 Fabian "fabiantheblind" Morón Zirfas
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this
   * software and associated documentation files (the "Software"), to deal in the Software
   * without restriction, including without limitation the rights to use, copy, modify,
   * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to the following
   * conditions:
   * The above copyright notice and this permission notice shall be included in all copies
   * or substantial portions of the Software.
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
   * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
   * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
   * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
   * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
   * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *
   * see also http://www.opensource.org/licenses/mit-license.php
   *
   */

  // UI BUILD WITH http://crgreen.com/boethos/
  // inspired by DUIK Tools

  run_aemaputil_script(this);

  function run_aemaputil_script(thisObj) {
    var version = "0.4";

    app.settings.saveSetting("aemaputil", "version", version);

    var WEBSITE = "http://fabiantheblind.github.com/AEMap/";
    if (parseFloat(app.version) < 10.0) {
      //     alert("I'm so sorry. This script works only in AE CS 5.\nI will try to fix that");
      // return;
    }

    // if (! app.settings.haveSetting("aemaputil", "version")){
    //   app.settings.saveSetting("aemaputil","version",version);
    // }

    //~ alert(app.settings.getSetting("aemaputil","version"));
    // alert("this script is not ready yet. its only the ui skeleton.\n check back later on " + WEBSITE);

    ///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW
    var win = build_aemaputil_UI(thisObj);
    if (win != null && win instanceof Window) {
      win.center();
      win.show();
    }

    // ------------ The User Interface ------------
    function build_aemaputil_UI(thisObj) {
      var BTTNSIZE = [130, 20];
      var GRPSIZE = [130, 110];
      var ETXTSIZE = [50, 20];

      // ------------ 3D and Collapse ------------
      var THREEDEE = true;
      var COLLTRANS = true;
      var INCLUDEPRECOMPS3D = true;
      var INCLUDEPRECOMPSSHDOW = true;

      // ------------ Sequence ------------
      var OFFSET = 1;

      // ------------ Set Duration ------------
      var DURTYPE = 0; // 0 for frames 1 for seconds
      var FRAMES = true;
      var SECONDS = false;
      var DURATION = 1;
      var INCLUDEPRECOMPSDUR = true;
      var FPS =
        app.settings.haveSetting("aemaputil", "fpsbase") == true
          ? app.settings.getSetting("aemaputil", "fpsbase")
          : "25";

      // ------------ for baking expressions bakeex or bex ------------
      var SELECTEDPROPS = true;
      var INCLUDEPRECOMPSBEX = false;

      // ------------ Error Strings ------------
      var ERRORoffset =
        "Please use only digits for the frameoffset.\nOffset is set to: ";
      var ERRORdurfr =
        "Please use only digits for the duration in frames.\nDuration is set to: ";
      var ERRORdursec =
        "Please use only floating point values for the duration in seconds. For example 2.5.\nDuration is set to: ";
      var ERRORfps =
        "Please use only digits for the frames per seconds.FPS is set to: ";
      var ERRORfpswrong =
        "The fps rate that you set is different from the active comp please correct that.";
      var ERROR3dnosel =
        "Uh that was hard. Not making 3D layers and not collapsing anything :).\nBut nice project man. Lots of layers and stuff... That means:\nPlease select at least one of the checkboxes";

      // ------------ UI Strings ------------
      var SEQHelptext =
        "\nSequencer:\nSelect some layers and define a frame offset. The Textbox accepts only digits!\n";
      var DURHelpText =
        "\nSet Duration:\nSelect some Layers and define a duration in frames or seconds. This will try to step into each precomp and set all layers and coms to the selected length. The Textbox accepts only digits when set to frames. If it is set to seconds it accepts floating point values. e.g. 2.5.\nif you change it will try to calculate the corresponding duration in frames or seconds\nWARNING this will not change the framerate of the comps.\n";
      var CT3DELPText =
        '\nCollapse and 3D:\nThis will change the collapse and 3D attributes of the selected layers.\nIf you select "precomps" it will step into every precomp and change them aswell\n';
      var BAKEEXHELPText =
        '\nBake Expressions:\nThis will try to bake all axpressions of every selected layer. If you set it to "selected properties only" it will...\n Yes you are right. Bake only the selected props ones. Baking can take a lot of time. It is much faster to use the selected props only\n';
      var SETTINGSHELPText =
        "\nSettings:\nHere you can look up the web resource and set the fps base for the frame to seconds conversion calculation\n";
      var TINYTOOLSHELPText =
        '\nTiny Tools:\nThese oneshot tools should make some tasks easier:\nname 2 source\nchanges the source name of the selected layer to the given name in the comp\nsource 2 name\nchanges the name of the selected layer to the source name in the project\nmarker/frame\nadds on the selected layer a marker per frame for the workare duration\nmarker/prcmps\nadds a marker for every source.layer in point for the selected layer\nnew render loc\nchanges the render location of all queued items in the render list and adds a folder with that name for every eport module. If the folder exists it uses this folder. Usefull when rendering lots of image sequences.\nCamWithDolly\nadds a 50mm camera to the comp and a dolly with some wiggle expression controls.\nZorro 2 Txt\ncreates for every Zorro Tag a Textlayer. It will split by "," and remove all asterix\n';
      var HELPText =
        "Quick Help\nFor further info go to the website at\n" +
        WEBSITE +
        "\n" +
        SEQHelptext +
        DURHelpText +
        CT3DELPText +
        BAKEEXHELPText +
        TINYTOOLSHELPText +
        SETTINGSHELPText;

      // ------------ for opening the website ------------
      var winProgramFiles = Folder.commonFiles.parent.fsName;
      var winBrowserCmd = winProgramFiles + "\\Internet Explorer\\iexplore.exe"; // You can chage the browser to use on windows here, use double slashes
      var macBrowserCmdStart = "osascript -e 'open location \"";
      var macBrowserCmdEnd = "\"'";

      // ------------ END OF GLOBALS ------------
      // finally a window
      var win =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "AEMap Utilities", [0, 0, 210, 175]);

      if (win != null) {
        win.vers = win.add("statictext", [7, 155, 200, 170], "v " + version);
        win.vers.justify = "right";

        win.help = win.add("button", [7, 5, 45, 25], "?");
        win.selector = win.add(
          "dropdownlist",
          [50, 5, 200, 25],
          [
            "Sequencer",
            "3D and Collapse",
            "Set Duration",
            "Bake Expressions",
            "Tiny Tools",
            "Settings"
          ]
        );
        win.selector.selection = 0;

        var panelsize = [5, 30, 200, 150];
        win.seq = win.add("panel", panelsize);
        win.seq.visible = true;
        win.c3d = win.add("panel", panelsize);
        win.c3d.visible = false;
        win.dur = win.add("panel", panelsize);
        win.dur.visible = false;
        win.bex = win.add("panel", panelsize);
        win.bex.visible = false;
        win.tools = win.add("panel", panelsize);
        win.tools.visible = false;

        win.settings = win.add("panel", panelsize);
        win.settings.visible = false;

        win.selector.onChange = function() {
          if (this.selection == 0) {
            win.seq.visible = true;
            win.c3d.visible = false;
            win.dur.visible = false;
            win.bex.visible = false;
            win.tools.visible = false;
            win.settings.visible = false;
          }
          if (this.selection == 1) {
            win.seq.visible = false;
            win.c3d.visible = true;
            win.dur.visible = false;
            win.bex.visible = false;
            win.tools.visible = false;

            win.settings.visible = false;
          }
          if (this.selection == 2) {
            //~    if (parseFloat(app.version) < 10.0){

            //~   alert("I'm so sorry but this behaves a bit bogus in CS 4 right now");
            //~  return;
            //~ }
            win.seq.visible = false;
            win.c3d.visible = false;
            win.dur.visible = true;
            win.bex.visible = false;
            win.tools.visible = false;
            win.settings.visible = false;
          }
          if (this.selection == 3) {
            win.seq.visible = false;
            win.c3d.visible = false;
            win.dur.visible = false;
            win.bex.visible = true;
            win.tools.visible = false;
            win.settings.visible = false;
          }
          if (this.selection == 4) {
            win.seq.visible = false;
            win.c3d.visible = false;
            win.dur.visible = false;
            win.bex.visible = false;
            win.tools.visible = true;

            win.settings.visible = false;
          }
          if (this.selection == 5) {
            win.seq.visible = false;
            win.c3d.visible = false;
            win.dur.visible = false;
            win.bex.visible = false;
            win.tools.visible = false;

            win.settings.visible = true;
          }
        };

        // ------------ sequencer ui ------------
        win.doseq = win.seq.add(
          "button",
          [3, 2, 188, 30],
          "sequence selection"
        );
        win.offsetlabel = win.seq.add(
          "statictext",
          [7, 40, 100, 60],
          "frame offset: "
        );
        win.offsetval = win.seq.add("edittext", [100, 40, 180, 60], "1");

        // ------------ 3d ui ------------

        win.ct3dbttn = win.c3d.add(
          "button",
          [3, 2, 188, 30],
          "collapse and 3d"
        );
        win.threedee = win.c3d.add("checkbox", [5, 40, 100, 60], "3D?");
        win.threedee.value = THREEDEE;
        win.ctrns = win.c3d.add("checkbox", [5, 60, 100, 80], "collapse?");
        win.ctrns.value = COLLTRANS;
        win.inclprc3d = win.c3d.add(
          "checkbox",
          [105, 40, 200, 60],
          "precomps?"
        );
        win.inclprc3d.value = INCLUDEPRECOMPS3D;
        win.inclprcshdow = win.c3d.add(
          "checkbox",
          [105, 60, 200, 80],
          "shadows?"
        );
        win.inclprcshdow.value = INCLUDEPRECOMPSSHDOW;
        win.inclprcshdow.visible = false;

        // ------------ set dur ui ------------
        win.setdur = win.dur.add("button", [3, 2, 188, 30], "set duration");

        win.durlabel = win.dur.add(
          "statictext",
          [7, 40, 100, 60],
          "new duration:"
        );
        win.durval = win.dur.add("edittext", [100, 40, 180, 60], "1");

        win.fpslabel = win.dur.add(
          "statictext",
          [7, 65, 100, 85],
          "fps base: "
        );
        win.fpsval = win.dur.add("edittext", [100, 65, 180, 85], FPS);

        win.radioframes = win.dur.add(
          "radiobutton",
          [7, 90, 100, 110],
          "frames"
        );
        win.radioframes.value = FRAMES;
        win.radiosec = win.dur.add(
          "radiobutton",
          [100, 90, 200, 110],
          "seconds"
        );
        win.radiosec.value = SECONDS;

        // ------------ bake ex ui ------------
        win.bakeexbttn = win.bex.add(
          "button",
          [3, 2, 188, 30],
          "bake expressions"
        );
        win.selprops = win.bex.add(
          "checkbox",
          [5, 40, 200, 60],
          "selected properties only?"
        );
        win.selprops.value = SELECTEDPROPS;
        win.inclprcmp = win.bex.add(
          "checkbox",
          [5, 60, 100, 80],
          "include precomps?"
        );
        win.inclprcmp.value = INCLUDEPRECOMPSBEX;
        win.inclprcmp.enabled = false;
        win.inclprcmp.visible = false;

        // ------------ tools ui ------------

        var bh = 25;
        var bgttr = 2;
        var x1 = 3;
        var x2 = 91;
        var x3 = 94;
        var x4 = 188;
        var y1 = 2;
        // ------------ row 1 ------------
        win.n2sn = win.tools.add(
          "button",
          [x1, y1, x2, y1 + bh],
          "name 2 source"
        );
        win.sn2n = win.tools.add(
          "button",
          [x3, y1, x4, y1 + bh],
          "source 2 name"
        );
        // ------------ row 2 ------------

        win.mpf = win.tools.add(
          "button",
          [x1, y1 + bh + bgttr, x2, y1 + bh * 2 + bgttr],
          "marker/frame"
        );
        win.mpprcmp = win.tools.add(
          "button",
          [x3, y1 + bh + bgttr, x4, y1 + bh * 2 + bgttr],
          "marker/prcmps"
        );
        // ------------ row 3 ------------

        win.rloc = win.tools.add(
          "button",
          [x1, y1 + bh * 2 + bgttr * 2, x2, y1 + bh * 3 + bgttr * 2],
          "new render loc"
        );
        win.dollycam = win.tools.add(
          "button",
          [x3, y1 + bh * 2 + bgttr * 2, x4, y1 + bh * 3 + bgttr * 2],
          "CamWithDolly"
        );

        // ------------ row 4 ------------
        win.dumbCom = win.tools.add(
          "button",
          [x1, y1 + bh * 3 + bgttr * 3, x2, y1 + bh * 4 + bgttr * 3],
          "zorro 2 txt"
        );

        win.nothing = win.tools.add(
          "button",
          [x3, y1 + bh * 3 + bgttr * 3, x4, y1 + bh * 4 + bgttr * 3],
          "undefined"
        );
        win.nothing.enabled = true;
        // ------------ settings ui ------------
        // var path = ((new File($.fileName)).path);
        // var myFile = new File( path+"/tempicon.png");

        // var myFile = new File("~/Desktop/xxxmyFilexxx.png");
        // myFile.encoding = "BINARY";
        // myFile.open( "w" );
        // myFile.write( myBinaryImg );
        // myFile.close();

        win.openolhelp = win.settings.add(
          "button",
          [3, 2, 188, 30],
          "open online reference"
        );
        // win.fpslabel = win.settings.add('statictext', [7,40,100,60], 'fps base: ');
        // win.fpsval = win.settings.add('edittext', [100,40,180,60], FPS);
        // win.img = win.settings.add("image", [3,63,180,80], myFile); //displaying it.
        // myFile.remove(); //no longer need the file, remove it.

        win.offsetval.onChange = function() {
          OFFSET = Math.abs(parseInt(this.text));
          if (isNaN(OFFSET) == true) {
            OFFSET = 1;
            this.text = 1;
            alert(ERRORoffset + OFFSET);
          }
        };

        win.threedee.onClick = function() {
          THREEDEE = this.value;
        };
        win.ctrns.onClick = function() {
          COLLTRANS = this.value;
        };
        win.inclprc3d.onClick = function() {
          INCLUDEPRECOMPS3D = this.value;
        };
        win.inclprcshdow.onClick = function() {
          INCLUDEPRECOMPSSHDOW = this.value;
        };

        win.durval.onChange = function() {
          if (FRAMES == true) {
            DURATION = Math.abs(parseInt(this.text));
            if (isNaN(DURATION) == true) {
              DURATION = 1;
              this.text = 1;
              alert(ERRORdurfr + DURATION);
            }
          }

          if (SECONDS == true) {
            DURATION = Math.abs(parseFloat(this.text));
            if (isNaN(DURATION) == true) {
              DURATION = 1;
              this.text = 1;
              alert(ERRORdursec + DURATION);
            }
          }
        };
        win.fpsval.onChange = function() {
          FPS = parseFloat(this.text);

          alert(
            "This is for the accurate calculation from seconds to frames only.\n It wont change your comps framerate! The script will use the comps framerate."
          );

          if (isNaN(FPS) == true) {
            FPS = 25;
            this.text = 25;
            alert(ERRORfps + FPS);
          } else {
            app.settings.saveSetting("aemaputil", "fpsbase", String(FPS));
          }
        };

        // Event listener for the radio buttons

        win.radiosec.onClick = win.radioframes.onClick = function() {
          if (win.radioframes.value == true) {
            FRAMES = true;
            SECONDS = false;
            DURTYPE = 0;
            var buff = win.durval.text;
            win.durval.text = parseInt(buff) * FPS;
          } else if (win.radiosec.value == true) {
            FRAMES = false;
            SECONDS = true;
            DURTYPE = 1;
            var buff = win.durval.text;
            win.durval.text = parseInt(buff) / FPS;
          }
        };

        win.selprops.onClick = function() {
          SELECTEDPROPS = this.value;
        };
        win.inclprcmp.onClick = function() {
          INCLUDEPRECOMPSBEX = this.value;
        };

        win.doseq.onClick = function() {
          //alert("Do it " + this.text);

          do_seq(OFFSET);
        };
        win.setdur.onClick = function() {
          // alert("Do it " + this.text);
          do_setDur(DURATION, DURTYPE, FPS);
        };
        win.bakeexbttn.onClick = function() {
          //alert("Do it " + this.text);
          do_bakeExpressions(SELECTEDPROPS, INCLUDEPRECOMPSBEX);
        };
        win.ct3dbttn.onClick = function() {
          // alert("Do it " + this.text);

          if (THREEDEE || COLLTRANS || INCLUDEPRECOMPSSHDOW) {
            do_3d_and_ct(
              THREEDEE,
              COLLTRANS,
              INCLUDEPRECOMPS3D,
              INCLUDEPRECOMPSSHDOW
            );
          } else {
            alert(ERROR3dnosel);
          }
        };

        win.n2sn.onClick = function() {
          name2sourceName();
        };
        win.sn2n.onClick = function() {
          sourcename2name();
        };
        win.rloc.onClick = function() {
          ChangeRenderLocations();
        };
        win.mpprcmp.onClick = function() {
          markerPerPrecomp();
        };
        win.mpf.onClick = function() {
          markerPerFrame();
        };
        win.dollycam.onClick = function() {
          camWithDolly();
        };
        win.dumbCom.onClick = function() {
          dumpCommentsToText();
        };
        win.nothing.onClick = function() {
          emptyFunction();
        };
        win.openolhelp.onClick = function() {
          alert("in here");
          openURL(WEBSITE, winBrowserCmd, macBrowserCmdStart, macBrowserCmdEnd);
        };
        win.help.onClick = function() {
          alert(HELPText);
        };

        // win.layout.layout(true);
        //           win.layout.resize();
        //          win.onResizing = win.onResize = function () {this.layout.resize();}
      }
      return win;
    }

    // ------------ END OF UI ------------

    // This function open a URL in a browser -
    //Copyright (c) 2006-2007 redefinery (Jeffrey R. Almasol). All rights reserved.

    function openURL(url, winBrowserCmd, macBrowserCmdStart, macBrowserCmdEnd) {
      if ($.os.indexOf("Windows") != -1) {
        system.callSystem('cmd /c "' + winBrowserCmd + '" ' + url);
      } else {
        system.callSystem(macBrowserCmdStart + url + macBrowserCmdEnd);
      }
    }

    // ------------ tools ------------

    function name2sourceName() {
      app.beginUndoGroup("Name 2 source name");
      var curComp = app.project.activeItem;

      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }

      if (curComp.selectedLayers.length < 1) {
        alert("Please select at least one layer");
        return;
      }
      var sel = curComp.selectedLayers;

      for (var i = 0; i < sel.length; i++) {
        try {
          sel[i].source.name = sel[i].name;
        } catch (e) {
          /* could be a light or camera*/
        }
      }
      app.endUndoGroup();
    }

    function sourcename2name() {
      app.beginUndoGroup("Source name 2 name");
      var curComp = app.project.activeItem;
      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }

      if (curComp.selectedLayers.length < 1) {
        alert("Please select art least one layer");
        return;
      }
      var sel = curComp.selectedLayers;

      for (var i = 0; i < sel.length; i++) {
        sel[i].name = sel[i].source.name;
      }
      app.endUndoGroup();
    }

    function markerPerPrecomp() {
      app.beginUndoGroup("Marker Per Precomp layer");
      var curComp = app.project.activeItem;
      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }
      if (curComp.selectedLayers.length < 1) {
        alert("sry. You need to select a layer");
        return;
      }
      var layer = curComp.selectedLayers[0];
      for (var i = 0; i < parseInt(layer.source.numLayers); i++) {
        var newMarkerVal = new MarkerValue(
          "." + layer.source.layers[i + 1].name
        );

        var markers = layer.property("marker");

        markers.setValueAtTime(
          layer.source.layers[i + 1].inPoint,
          newMarkerVal
        );
      }
      app.endUndoGroup();
    }

    function markerPerFrame() {
      app.beginUndoGroup("Marker Per Frame");
      var curComp = app.project.activeItem;
      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }
      if (curComp.selectedLayers.length < 1) {
        alert("sry. You need to select a layer");
        return;
      }

      var layers = curComp.selectedLayers;
      var a = curComp.frameDuration;
      var b = curComp.workAreaDuration;
      var c = curComp.workAreaStart;
      var d = curComp.frameRate;

      var len = b * d;

      //alert(len);
      for (var j = 0; j < layers.length; j++) {
        layer = layers[j];

        for (var i = 0; i < len; i++) {
          var m = new MarkerValue("");
          var markers = layer.property("marker");
          markers.setValueAtTime(c + i * a, m);
        }
        app.endUndoGroup();
      }
    }

    function emptyFunction() {
      alert("Hello I'm a empty function. play with me...");
    }

    function ChangeRenderLocations() {
      var scriptName = "Change Render Locations 2 new Folders";

      var newLocation = Folder.selectDialog("Select a render output folder...");

      if (newLocation != null) {
        app.beginUndoGroup(scriptName);

        // Process all render queue items whose status is set to Queued.
        for (var i = 1; i <= app.project.renderQueue.numItems; ++i) {
          var curItem = app.project.renderQueue.item(i);

          if (curItem.status == RQItemStatus.QUEUED) {
            // Change all output modules for the current render queue item.
            for (j = 1; j <= curItem.numOutputModules; ++j) {
              var curOM = curItem.outputModule(j);
              // this is the addition by fabiantheblind
              if (curItem.numOutputModules > 1) {
                var targetFolder = new Folder(
                  newLocation.fsName + "/" + curItem.comp.name + "_" + j
                );
              } else {
                var targetFolder = new Folder(
                  newLocation.fsName + "/" + curItem.comp.name
                );
              }
              if (!targetFolder.exists) {
                targetFolder.create();
              }
              var tF = targetFolder.fsName;
              // now there is a folder for each output module
              // from here on
              var oldLocation = curOM.file;
              curOM.file = new File(tF + "/" + oldLocation.name);

              //alert("New output path:\n"+curOM.file.fsName, scriptName);
            }
          }
        }
        alert("done");
        app.endUndoGroup();
      }
    }

    function camWithDolly() {
      app.beginUndoGroup("build 50mm Cam With Dolly");
      var curComp = app.project.activeItem;
      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }

      var cam = curComp.layers.addCamera("Cam1", [
        curComp.width / 2,
        curComp.height / 2
      ]);
      var dolly = curComp.layers.addNull();

      // make a unique name for the null
      dolly.source.name = "dolly Cam1";
      dolly.threeDLayer = true;
      var strength = dolly("ADBE Effect Parade").addProperty(
        "ADBE Slider Control"
      );
      strength.name = "strength";

      var perSecond = dolly("ADBE Effect Parade").addProperty(
        "ADBE Slider Control"
      );
      perSecond.name = "perSecond";
      dolly.position.expression =
        'wiggle(effect("perSecond")("ADBE Slider Control-0001"),effect("strength")("ADBE Slider Control-0001"));\n';
      cam.parent = dolly;
      cam.position.setValue([0, 0, -1500]);

      app.endUndoGroup();
    }

    function dumpCommentsToText() {
      app.beginUndoGroup("dumb dump comments");
      var cc = app.project.activeItem;
      if (!cc || !(cc instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }
      if (cc.selectedLayers.length < 1) {
        alert("Please select at least one layer.");
        return;
      }

      var names = new Array();
      var pat = "*";

      //~ var reg = new RegExp("\n|\r","g");

      //~ var reg = new RegExp("", "g");

      for (var i = 0; i < cc.selectedLayers.length; i++) {
        if (!cc.selectedLayers[i].locked) {
          var cmt = cc.selectedLayers[i].comment;
          var newStr = cmt.split("*").join("");

          var arr = newStr.split(",");
          for (var j = 0; j < arr.length; j++) {
            names.push(arr[j]);
          }
          //~         names.push(cc.selectedLayers[i].comment.substring (1, cc.selectedLayers[i].comment.length));
        }
      }

      for (var j = 0; j < names.length; j++) {
        if (names[j].length > 0) cc.layers.addText(names[j]);
      }

      app.endUndoGroup();
    }

    //  ____  _____
    // |___ \|  __ \
    //   __) | |  | |
    //  |__ <| |  | |
    //  ___) | |__| |
    // |____/|_____/

    // ------------ CT & 3D START ------------

    function do_3d_and_ct(
      THREEDEE,
      COLLTRANS,
      INCLUDEPRECOMPS3D,
      INCLUDEPRECOMPSSHDOW
    ) {
      app.beginUndoGroup("make all 3 D");
      var curComp = app.project.activeItem;
      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a Composition.");
        return;
      }

      if (curComp.selectedLayers.length < 1) {
        alert("Please select at least 1 layers");
        return;
      }
      var ls = curComp.selectedLayers;
      loop_Items(
        ls,
        0,
        THREEDEE,
        COLLTRANS,
        INCLUDEPRECOMPS3D,
        INCLUDEPRECOMPSSHDOW
      );
    }

    // the startindex is important
    // the app.project.item(index).layers starts at 1 an array starts at 0
    function loop_Items(
      layers,
      strtNdx,
      THREEDEE,
      COLLTRANS,
      INCLUDEPRECOMPS3D,
      INCLUDEPRECOMPSSHDOW
    ) {
      // add the startindex to fit to the app.project.item(index).layers values or the array
      var selLen = layers.length;
      selLen = selLen + strtNdx;

      // the loop
      for (var i = strtNdx; i < selLen; i++) {
        // now we loop thru all that gets pushed to this function
        // the trick is inside
        eval_item(
          layers[i],
          THREEDEE,
          COLLTRANS,
          INCLUDEPRECOMPS3D,
          INCLUDEPRECOMPSSHDOW
        );
      }
    }

    function eval_item(
      inLayer,
      THREEDEE,
      COLLTRANS,
      INCLUDEPRECOMPS3D,
      INCLUDEPRECOMPSSHDOW
    ) {
      // the layer to work on
      // it also can be a comp
      var layer = inLayer;

      //thnx 2 Jeff Almasol
      // and this: http://www.redefinery.com/ae/fundamentals/layers/
      if (layer.source instanceof CompItem) {
        collapse_and_make3d(layer, THREEDEE, COLLTRANS, INCLUDEPRECOMPSSHDOW);
        if (INCLUDEPRECOMPS3D == true) {
          loop_Items(
            layer.source.layers,
            1,
            THREEDEE,
            COLLTRANS,
            INCLUDEPRECOMPS3D,
            INCLUDEPRECOMPSSHDOW
          );
        }
      } else {
        collapse_and_make3d(layer, THREEDEE, COLLTRANS, INCLUDEPRECOMPSSHDOW);
      }
    }

    function collapse_and_make3d(
      layer,
      THREEDEE,
      COLLTRANS,
      INCLUDEPRECOMPSSHDOW
    ) {
      if (layer.locked) return;
      if (THREEDEE) {
        try {
          if (layer.threeDLayer == false) {
            layer.threeDLayer = true;
          }
        } catch (e) {
          /* Could be a light or a camera*/
        }
      }
      if (COLLTRANS) {
        if (layer.canSetCollapseTransformation == true) {
          layer.collapseTransformation = true;
        }
      }

      if (layer.threeDLayer == true && INCLUDEPRECOMPSSHDOW == true) {
        try {
          //~         layer.property("ADBE Material Options Group").property("ADBE Casts Shadows")  = 1;
        } catch (e) {
          if (DEBUG) alert("Shadow aktivation failed\n" + e);
        }
      }
    }
    // ------------ CT & 3D END ------------
    // ------------ sequence stuff ------------

    function do_seq(OFFSET) {
      // based on the script delivered with this VC post
      // http://www.videocopilot.net/tutorials/shatterize/
      app.beginUndoGroup("sequence layers by " + OFFSET + " frames");
      var curComp = app.project.activeItem;
      if (!curComp || !(curComp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
      }
      if (curComp.selectedLayers.length < 2) {
        alert("Please select at least 2 layers");
        return;
      }

      var offsetFrames = OFFSET;
      var inpoint = curComp.selectedLayers[0].inPoint;

      for (
        var layerId = 0;
        layerId < curComp.selectedLayers.length;
        layerId++
      ) {
        var layer = curComp.selectedLayers[layerId];

        layer.startTime = inpoint + layerId * (OFFSET * curComp.frameDuration);
      }

      app.endUndoGroup();
    }
    // ------------ SEQUENZ END ------------
    // ------------ SET DURATION START ------------

    function do_setDur(DURATION, DURTYPE) {
      // get the current active composition
      var curComp = app.project.activeItem;

      // if ther is no comp
      if (!curComp || !(curComp instanceof CompItem)) {
        // alert and end the script
        alert("please select a composition and at least a layer");
        return;
      }
      // start undogroup
      app.beginUndoGroup("change duration");

      // get all the layers
      var sellayers = curComp.selectedLayers;
      if (!sellayers.length) {
        // alert and end the script
        alert("please select at least one layer");
        return;
      }

      // get them all into an array
      var layers = new Array();
      for (var i = 0; i < curComp.selectedLayers.length; i++) {
        layers.push(sellayers[i]);
      }

      // ****************************************************
      var val;
      if (DURTYPE == 0) {
        // frames
        val = DURATION / curComp.frameRate;
      } else if (DURTYPE == 1) {
        //seconds
        val = DURATION;
      }
      // this starts the looping thru all items
      // if(INCLUDEPRECOMPSDUR){
      //     curComp.duration = val;
      //     }
      chngDur(layers, val, 0);

      // ****************************************************

      //end undogroup
      app.endUndoGroup();
    }
    // the startindex is important
    // the app.project.item(index).layers starts at 1 an array starts at 0
    function chngDur(layers, val, strtNdx) {
      // add the startindex to fit to the app.project.item(index).layers values or the array
      var selLen = layers.length + strtNdx;

      // the loop
      for (var i = strtNdx; i < selLen; i++) {
        //try {
        // now we loop thru all that gets pushed to this function
        // the trick is inside
        change(layers[i], val);
        //}catch(e){

        //$.writeln (e);
        //}
      }
    }

    function change(inLayer, val) {
      // the layer to work on
      // it also can be a comp
      var layer = inLayer;

      if (
        layer instanceof LightLayer ||
        layer instanceof CameraLayer ||
        layer instanceof TextLayer ||
        layer instanceof ShapeLayer
      ) {
        layer.inPoint = 0;
        layer.outPoint = val;
      } else {
        // this is the trick if the layer has some layers inside
        if (layer.source.numLayers != null) {
          // still set the duration and in out points
          layer.source.duration = val;
          layer.inPoint = 0;
          layer.outPoint = val;
          // and now send the content of the layer back into the loop
          chngDur(layer.source.layers, val, 1);
        } else {
          // if it is just a layer set the in out point
          layer.inPoint = 0;
          layer.outPoint = val;
        }
      }
    }

    // ------------ SET DURATION END ------------

    //  ____          _  ________   ________   __
    // |  _ \   /\   | |/ /  ____| |  ____\ \ / /
    // | |_) | /  \  | ' /| |__    | |__   \ V /
    // |  _ < / /\ \ |  < |  __|   |  __|   > <
    // | |_) / ____ \| . \| |____  | |____ / . \
    // |____/_/    \_\_|\_\______| |______/_/ \_\

    // ------------ BAKE EXPRESSION START ------------

    // bake stuff start this is actually by fabiantheblind
    // the rest is taken from the world wide world of webs
    function do_bakeExpressions(SELECTEDPROPS, INCLUDEPRECOMPSBEX) {
      // get the current active composition
      var curComp = app.project.activeItem;

      // if ther is no comp
      if (!curComp || !(curComp instanceof CompItem)) {
        // alert and end the script
        alert("Please select a composition and some layers with expressions");
        return;
      }
      // start undogroup
      app.beginUndoGroup("bake expressions");

      // get all the layers
      var sellayers = curComp.selectedLayers;
      if (!sellayers.length) {
        // alert and end the script
        alert("Please select a layer wit some expressions");
        return;
      }

      // get them all into an array
      var layers = new Array();
      for (var i = 0; i < curComp.selectedLayers.length; i++) {
        layers.push(sellayers[i]);
      }
      // this starts the looping thru all items

      if (SELECTEDPROPS == true) {
        for (var j = 0; j < layers.length; j++) {
          var props = layers[j].selectedProperties;

          if (props.length < 1) {
            alert("there are no properties selected");
            return;
          }

          bex_selProps(props);
        }
      } else {
        bex_loop_Items(layers, 0, INCLUDEPRECOMPSBEX);
      }

      //end undogroup
      app.endUndoGroup();

      alert("Your cake is ready.\n");
    }

    // the startindex is important
    // the app.project.item(index).layers starts at 1 an array starts at 0
    function bex_loop_Items(layers, strtNdx, INCLUDEPRECOMPSBEX) {
      // add the startindex to fit to the app.project.item(index).layers values or the array
      var selLen = layers.length;
      selLen = selLen + strtNdx;

      // the loop
      for (var i = strtNdx; i < selLen; i++) {
        // now we loop thru all that gets pushed to this function
        // the trick is inside
        bex_eval_item(layers[i], INCLUDEPRECOMPSBEX);
      }
    }

    function bex_eval_item(inLayer, INCLUDEPRECOMPSBEX) {
      // the layer to work on
      // it also can be a comp
      var layer = inLayer;

      //thnx 2 Jeff Almasol
      // and this: http://www.redefinery.com/ae/fundamentals/layers/
      if (layer.source instanceof CompItem) {
        bex_loop_Prop(layer);
        if (INCLUDEPRECOMPSBEX == true) {
          bex_loop_Items(layer.source.layers, 1, INCLUDEPRECOMPSBEX);
        }
      } else {
        bex_loop_Prop(layer);
      }
    }

    function bex_loop_Prop(layer) {
      for (var j = 1; j <= layer.numProperties; j++) {
        var prop = layer.property(j);
        bex(prop);
      }
    }

    // this is from nab i think
    function bex_convertToKeyframes(theProperty) {
      if (theProperty.canSetExpression && theProperty.expressionEnabled) {
        theProperty.selected = true;

        // english version
        //app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
        // german version "Expression in Keyframes umwandeln"
        app.executeCommand(2639); // or just use the Id need to test it in english
        theProperty.selected = false;
      }
    }

    function bex_selProps(props) {
      for (var j = 1; j < props.length; j++) {
        var prop = props[j];
        bex(prop);
      }
    }

    function bex(prop) {
      if (prop.canSetExpression == true) {
        if (prop.expressionEnabled == true && prop.expression != null) {
          bex_convertToKeyframes(prop);
        }
      }

      if (prop.numProperties != null) {
        bex_loop_Prop(prop);
      }
    }

    // ------------ BAKE EX END ------------
  } // ------------ THIS IS THE END OF RUNSCRIPT ------------
}
