
function byID(id) {return document.getElementById(id);}

function random(max) {return Math.floor(Math.random() * (parseInt(max) + 1));}

function log(line) {
    if(debug) {
        if(emulate) {
            if(byID("debug")) {
                byID("debug").innerHTML +="<p>" + line + "</p>";    // print to browser field
            }
        } else {
            gSTB.Debug(line);   // print to consol (ssh)
        }
    }
}

/**
 * `string_replace` is function for replace parts of string
 *
 * @function
 * @name string_replace
 * @param {string_replace(search, replace, subject, count):*}
 * @example
 * string_replace('&amp;', '&', 'string &amp; me');
 * @return string
 */
function string_replace (search, replace, subject, count) {
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i=0, sl=s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j=0, fl=f.length; j < fl; j++) {
            temp = s[i]+'';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length-s[i].length)/f[j].length;}
        }
    }
    return sa ? s : s[0];
}

/**
 * `print_r` is function for create string from object|array
 *
 * @function
 * @name print_r
 * @param {print_r(object|array):*}
 * @example
 * print_r(eval('{"main":{"one":1,"0":"zero"}}'));
 * @return string
 */
function print_r(arr, level) {
    var print_red_text = "";
    if(!level) level = 0;
    var level_padding = "";
    for(var j=0; j<level+1; j++) level_padding += "    ";
    if(typeof(arr) == 'object') {
        for(var item in arr) {
            var value = arr[item];
            if(typeof(value) == 'object') {
                print_red_text += level_padding + "'" + item + "' :\n";
                print_red_text += print_r(value,level+1);
        }
            else
                print_red_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
        }
    }

    else  print_red_text = "===>"+arr+"<===("+typeof(arr)+")";
    return print_red_text;
}

/**
 * `is_numeric` is function checking on int value
 *
 * @function
 * @name is_numeric
 * @param {is_numeric(value):*}
 * @example
 * is_numeric('999');
 * @return bool
 */
function is_numeric(mixed_var) {
    return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}

/**
 * `empty` is function checking on exits value
 *
 * @function
 * @name empty
 * @param {empty(value):*}
 * @example
 * empty('');
 * @return bool
 */
function empty (mixed_var) {
    if (mixed_var === "" ||
        mixed_var === 0 ||
        mixed_var === "0" ||
        mixed_var === null ||
        mixed_var === false ||
        typeof mixed_var === 'undefined' ||
        typeof mixed_var === 'NaN'
    ) {
        return true;
    }
    if (typeof mixed_var == 'object') {
        for (var key in mixed_var) {
            return false;
        }
        return true;
    }
    return false;
}

/**
 * `separate` is function checking on exits value
 *
 * @function
 * @name separate
 * @param {separate(value):*}
 * @example
 * separate(95466725);
 * @return string
 */
function separate(number) {
    number = parseInt(number);
    var n_s = number.toString();
    if(number<100000) {
        return number;
    } else {
        if (number < 999999) {
            return n_s.substr(0, n_s.length - 3) + lang.count.thousands;
        } else {
            return n_s.substr(0, n_s.length - 6) + lang.count.millions;
        }
    }
}

/**
 * `isset` is function checking on exits var
 *
 * @function
 * @name isset
 * @param {isset(object):*}
 * @example
 * isset(s);
 * @return bool
 */
function isset () {
    var a = arguments, l = a.length, i = 0, undef;
    if (l === 0) {
        throw new Error('Empty isset');
    }
    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
}
/**
 * `setEnvironmentValue` is function for set var, value to devise
 *
 * @function
 * @name setEnvironmentValue
 * @param {function():*}
 * @example
 * setEnvironmentValue();
 * @return void
 */
function setEnvironmentValue(name, value){
    //var strout = 'Saving ' + name + ' = ';
    //strout += value;
    stb.RDir('setenv ' + name + ' ' + value);
    //log(strout);
}
/**
 * `getEnvironmentValue` is function for get var value from devise
 *
 * @function
 * @name getEnvironmentValue
 * @param {function(name):*}
 * @example
 * getEnvironmentValue('quality');
 * @return string
 */
function getEnvironmentValue(name){
    //log('readed value: ' + name);
    return stb.RDir('getenv ' + name);
}

function trimLeft(str) {
  return str.replace(/^\s+/, '');
}

function trimRight(str) {
  return str.replace(/\s+$/, '');
}

function trim(str) {
  return trimRight(trimLeft(str));
}

function trimSpaces(str) {
  return str.replace(/\s{2,}/g, ' ');
}