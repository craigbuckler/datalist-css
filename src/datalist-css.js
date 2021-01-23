/*
datalist-css.js module

load script:
<script type="module" src="./dist/datalist-css.js"></script>

Then style <datalist> and <option> fields using CSS.
Note the <datalist> should be placed immediately after its <input>.
*/
(() => {

  // currently active list
  let listActive;

  // datalist handler events
  document.body.addEventListener('focusin', listShow);

  // datalist control focused?
  function listShow(e) {

    const input = target(e);
    if (!input) return;

    if (input.list) {

      // setup of datalist control
      const dl = input.list;
      input.datalist = dl;
      input.removeAttribute('list');

      dl.input = input;
      dl.setAttribute('tabindex', -1);

      // event handlers
      input.addEventListener('input', listLimit);
      input.addEventListener('keydown', listControl);
      dl.addEventListener('keydown', listKey);
      dl.addEventListener('click', listSet);

    }

    // show datalist
    const dl = input.datalist;
    if (dl && !dl.shown) {

      listHide(listActive);

      dl.shown = true;
      listLimit(e);
      dl.style.width = input.offsetWidth + 'px';
      dl.style.left = input.offsetLeft + 'px';
      dl.style.display = 'block';
      listActive = dl;

    }

  }


  // hide datalist
  function listHide(dl) {

    if (dl && dl.shown) {

      dl.style.display = 'none';
      dl.shown = false;

    }

  }


  // enable valid and disable invalid options
  function listLimit(e) {

    const input = target(e);
    if (!input || !input.datalist) return;

    const v = input.value.trim().toLowerCase();
    Array.from(input.datalist.getElementsByTagName('option')).forEach(opt => {
      opt.setAttribute('tabindex', 0);
      opt.style.display = !v || opt.value.toLowerCase().includes(v) ? 'block' : 'none';
    });

  }


  // key event on input
  function listControl(e) {

    const input = target(e);
    if (!input || !input.datalist) return;

    switch (e.keyCode) {

      case 40: {
        // arrow down
        let opt = input.datalist.firstElementChild;
        if (!opt.offsetHeight) opt = visibleSibling(opt, 1);
        opt && opt.focus();
        break;
      }

      case 9:   // tab
        listHide(input.datalist);
        break;

      case 13:  // enter
      case 32:  // space
        listSet(e);
        break;

    }

  }


  // key event on datalist
  const keymap = {
    33: -12,
    34: 12,
    38: -1,
    40: 1
  };

  function listKey(e) {

    const t = target(e);
    if (!t) return;

    const
      kc = e.keyCode,
      dir = keymap[kc],
      dl = t.parentElement;

    if (dir) {

      // move through list
      let opt = visibleSibling(t, dir);
      opt && opt.focus();
      e.preventDefault();

    }
    else if (kc === 9 || kc === 13 || kc === 32) {

      // tab, enter, space: use value
      listSet(e);

    }
    else if (kc === 8) {

      // backspace: return to input
      dl.input.focus();

    }
    else if (kc === 27) {

      // esc: hide list
      listHide(dl);

    }

  }


  // get previous/next visible sibling
  function visibleSibling(opt, dir) {

    let newOpt = opt;

    do {

      if (dir < 0) {
        newOpt = newOpt.previousElementSibling;
      }
      else if (dir > 0) {
        newOpt = newOpt.nextElementSibling;
      }

      if (newOpt && newOpt.offsetHeight) {
        opt = newOpt;
        dir -= Math.sign(dir);
      }

    } while (newOpt && dir);

    return opt;

  }


  // set datalist option to input value
  function listSet(e) {

    const
      t = target(e),
      dl = t && t.parentElement;

    if (!dl || !dl.input) return;

    dl.input.value = (t && t.value) || '';
    listHide(dl);

  }


  // fetch target node
  function target(t) {
    return t && t.target;
  }


})();
