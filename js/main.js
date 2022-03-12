const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search AttendanceRegister.json and filter it.
const searchStates = async (searchText) => {
  const res = await fetch("../data/AttendanceRegister.json");
  const states = await res.json();

  // input section
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.employeName.match(regex);
  });

  if (searchText.length == 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

// showing the results
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
            <div class="card card-body mb-1">
                <h6>
                    Employee Name: <span class="text-primary">${
                      match.employeName
                    } </span>\xa0\xa0\xa0
                    Date: <span class="text-primary">${
                      match.date
                    } </span> \xa0\xa0\xa0
                    Checking Time: <span class="text-primary">${
                      match.checkinTime
                    } </span> \xa0\xa0\xa0
                    Checkout Time:<span class="text-primary">${
                      match.checkouttime
                    } </span>\xa0\xa0\xa0
                    Department: <span class="text-primary">${
                      match.dept
                    } </span>  \xa0\xa0\xa0
                    Working Time: <span class="text-primary">${
                      parseInt(match.checkouttime) - parseInt(match.checkinTime)
                    } </span> hours of work per day  
                </h6>            
            </div>
            `
      )
      .join("");

    console.log(html);
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
