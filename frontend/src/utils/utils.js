const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
};
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
        <div className="alert alert-danger" role="alert">
            The password must be between 6 and 40 characters.
        </div>
        );
    }
};

function _monthAbbr(month) {
    const abbrvs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return abbrvs[parseInt(month)];
}

function epochToPartsLocal(epoch) {
    if (epoch === 0 || epoch === null || epoch === undefined) {
        return {};
    }

    const date = new Date(epoch);
    const month = date.getMonth();
    const year = date.getFullYear();
    let day = date.getDate();
    day = (day>9) ? day : "0"+day;

    let hours = date.getHours();
    hours = (hours>9) ? hours : "0" + hours;
    let mins = date.getMinutes();
    mins = (mins>9) ? mins : "0" + mins;

    // all string values with leading '0' except for monthIdx.
    return {
        year: year,
        monthIdx: month, // 0 based
        month: (month>8) ? month+1 : '0' + (month+1),
        day: day,
        hours: hours,
        mins: mins
    };
}

function epochToDMY(epoch, full = false, format12Hour = false) {
    if (epoch === 0 || epoch === null || epoch === undefined) {
        return "none";
    }

    const parts = epochToPartsLocal(epoch);

    let hrmin = "";
    if (full) {
        hrmin = " " + parts.hours + ":" + parts.mins;
    }
    if (full && format12Hour) {
        const period = parts.hours < 12 ? "AM" : "PM";
        hrmin = " " + (parts.hours % 12 || 12) + ":" + parts.mins + " " + period;
    }

    return parts.day + " " + _monthAbbr(parts.monthIdx) + " " + parts.year + hrmin;
}

const getTimeUnitAndCount = (time) => {
    let unit = "";
    let count = 0;
    if (Math.floor(time / 31536000) > 0) {
        unit = "Years";
        count = Math.floor(time / 31536000);
        
    } else if (Math.floor(time / 2592000) > 0) {
        unit = "Months";
        count = Math.floor(time / 2592000);
    } else {
        unit = "Days";
        count = Math.floor(time / 86400);
    }

    return {
        "unit": unit, 
        "count": count 
    };

};

const generateTypesOpt = (typeList) => {
    return typeList.map((type) => {
        return {
            "label": type,
            "value": type
        }
    });
}

export {
    required,
    vusername,
    vpassword,
    epochToDMY,
    getTimeUnitAndCount,
    generateTypesOpt
}