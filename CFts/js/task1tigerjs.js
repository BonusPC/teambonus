let copyCount = 0;
let currentCopyIndex = 0;
let batchSize = 5000;
const blacklv = ["10", "20", "30", "50", "100", "200", "内部测试层级", "套利玩家", "CPF黑名单"];
const okstt = ["Normal", "正常"];

function check() {
    const table1 = document.getElementById("resultTable1");
    const headerRow = table1.rows[0];
    table1.innerHTML = "";
    table1.appendChild(headerRow);

    const Oldlist = document.getElementById("oldlist").value;
    const rowsoldlist = Oldlist.split('\n').map(row => row.split('\t')[0]);

    if (Oldlist.trim() === "") {
        const confirmResult = confirm("Ahai say : You haven't entered Oldlist. This could be make you DOUBLE SEND Bonus 0.55. Do you want to continue?");
        if (!confirmResult) {
            return;
        }
    }

    const Databank = document.getElementById("Databank").value;
    const rows = Databank.split('\n');

    const fragment = document.createDocumentFragment();

    rows.forEach(row => {
        const [Account, Status, level, CPF] = row.split('\t');

        if (!rowsoldlist.includes(Account) && !blacklv.includes(level) && okstt.includes(Status) && CPF.trim() !== "") {
            let newRow = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            cell1.textContent = '="' + Account + '"';
            cell2.textContent = CPF;
            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            fragment.appendChild(newRow);
        }
    });

    table1.appendChild(fragment);
}


function copy() {
    let qqValues = [];
    let table1 = document.getElementById("resultTable1");

    if (table1.rows.length < 2) {
        alert("No data to copy.");
        return;
    }

    const totalRows = table1.rows.length;

    for (let i = 1; i < Math.min(currentCopyIndex + batchSize, totalRows); i++) {
        let qq = table1.rows[i].cells[1].textContent.trim();

        if (qq.length < 11) {
            qq = '0'.repeat(11 - qq.length) + qq;
        }

        qqValues.push(qq);
    }

    const textArea = document.createElement('textarea');
    textArea.value = qqValues.join('\n');
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    copyCount++;

    alert("Copied " + qqValues.length + " rows. Copy time: " + copyCount);

    currentCopyIndex += batchSize;

    if (currentCopyIndex >= totalRows) {
        alert("Copied all data.");
        currentCopyIndex = 0;
        copyCount = 0;
    }
}

function populateDropdown() {
  const psys = document.getElementById("Psys").value;
  const rowpsys = psys.split('\n');
  const Timesent = [];

  for (let i = 1; i < rowpsys.length; i++) {
    const [select, timeupload, name, Bonus, typebn, qq, phonenb, mail, sent, TimesentValue, opetor, cc] = rowpsys[i].split('\t');

    if (TimesentValue !== "派送时间" && TimesentValue !== undefined) {
      let paidnewtime = TimesentValue.replace(/年|月/g, "-").replace("日", "");
      let parsedTime = new Date(paidnewtime);
      
      // Check for duplicate TimesentValue
      if (!Timesent.some(item => item.value === TimesentValue)) {
        Timesent.push({ time: parsedTime, value: TimesentValue });
      }
    }
  }

  const currentTime = new Date();

  let sortedPaidTime = Timesent.slice().sort((a, b) => Math.abs(a.time - currentTime) - Math.abs(b.time - currentTime));
   
  const dropdown = document.getElementById("dropdownList");
  dropdown.innerHTML = "";

  sortedPaidTime.forEach(item => {
    let option = document.createElement("option");
    option.text = item.value; // Hiển thị TimesentValue
    dropdown.add(option);
  });
}



function check2() {
    const table2 = document.getElementById("resultTable2");
    const headerRow = table2.rows[0];
    table2.innerHTML = "";
    table2.appendChild(headerRow);

    const DataTB1 = document.getElementById("resultTable1");
    const rowsDataTB1 = DataTB1.rows;

    const psys = document.getElementById("Psys").value;
    const rowpsys = psys.split('\n');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < rowsDataTB1.length; i++) {
        let hyids = rowsDataTB1[i].cells[0].textContent.trim();
        let QQS = parseInt(rowsDataTB1[i].cells[1].textContent.trim()); // Chuyển QQS thành số nguyên

        for (let j = 0; j < rowpsys.length; j++) {
            const rowData = rowpsys[j].split('\t');
            if (rowData.length >= 6) {
                const [select, timeupload, name, Bonus, typebn, qq, phonenb, mail, sent, Timesent, opetor, cc] = rowData;
                let qqNumber = parseInt(qq); // Chuyển qq thành số nguyên

                if (QQS === qqNumber) {
                    let newRow = document.createElement('tr');
                    let cell1 = document.createElement('td');
                    let cell2 = document.createElement('td');
                    let cell3 = document.createElement('td');
                    let cell4 = document.createElement('td');

                    cell1.textContent = hyids;
                    cell2.textContent = Bonus;
                    cell3.textContent = Timesent;
                    cell4.textContent = qq;

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    newRow.appendChild(cell3);
                    newRow.appendChild(cell4);

                    fragment.appendChild(newRow);
                }
            }
        }
    }

    table2.appendChild(fragment);
populateDropdown()
count()
}

function check3() {
  const table2 = document.getElementById("resultTable2");
  const headerRow = table2.rows[0];
  table2.innerHTML = "";
  table2.appendChild(headerRow);
  
  const DataTB1 = document.getElementById("resultTable1");
  const rowsDataTB1 = DataTB1.rows;
  
  const psys = document.getElementById("Psys").value;
  const rowpsys = psys.split('\n');
  const fragment = document.createDocumentFragment();

  const selectedTimevalue = document.getElementById("dropdownList").value;
  let selectedTime = selectedTimevalue !== undefined ? selectedTimevalue.toString() : '';

  rowpsys.forEach(row => {
    const [select, timeupload, name, Bonus, typebn, qq, phonenb, mail, sent, Timesentvalue, opetor, cc] = row.split('\t');
    let Timesent = Timesentvalue !== undefined ? Timesentvalue.toString() : '';
    if (Timesent === selectedTime && phonenb === "111") {
      for (let i = 0; i < rowsDataTB1.length; i++) {
        let hyids = rowsDataTB1[i].cells[0].textContent.trim();
        let QQS = parseInt(rowsDataTB1[i].cells[1].textContent.trim());
        let qqNumber = parseInt(qq);
        if (QQS === qqNumber) { 
          let newRow = document.createElement('tr');
          let cell1 = document.createElement('td');
          let cell2 = document.createElement('td');
          let cell3 = document.createElement('td');
          let cell4 = document.createElement('td');
 
          cell1.textContent = hyids;
          cell2.textContent = Bonus;
          cell3.textContent = Timesentvalue; 
          cell4.textContent = qq; 
          newRow.appendChild(cell1);
          newRow.appendChild(cell2);
          newRow.appendChild(cell3);
          newRow.appendChild(cell4);
          fragment.appendChild(newRow);
        }
      }
    }
  });

  table2.appendChild(fragment);
  count();
}



function copy1() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];

 copiedData.push("会员账号\t奖励金额\t稽核倍数\t前台备注\t后台备注");

    for (let i = 1; i < table2.rows.length; i++) {
        let memberId = table2.rows[i].cells[0].innerText;
        let amount = parseInt(table2.rows[i].cells[1].innerText); // Chuyển đổi amount sang kiểu số nguyên

        // Xử lý logic tính toán bonus dựa trên giá trị amount
        let bonus = (amount === 50 || amount === 200 ? 15 : amount === 30 || amount === 100 ? 10 : amount === 20 ? 3 : 2);

        // Tạo chuỗi dữ liệu để sao chép vào textarea
        let rowData = memberId + "\t" + bonus + "\t" + "10" + "\t" + "【Bônus de Registro】" + "\t" + "【Bônus de Registro】";
        copiedData.push(rowData);
    }

    const textArea = document.createElement('textarea');
    textArea.value = copiedData.join('\n');
    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied successfully 'Member ID' and 'Bonus' from Table2 to import file send.");
}

function check4() {
    const table3 = document.getElementById("resultTable3");
    const headerRow = table3.rows[0];
    table3.innerHTML = "";
    table3.appendChild(headerRow);

    const DataTB1 = document.getElementById("resultTable1");
    const rowsDataTB1 = DataTB1.rows;

    const psys = document.getElementById("Psys").value;
    const rowpsys = psys.split('\n');
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < rowsDataTB1.length; i++) { // Thay đổi từ 1 thành 0 ở đây
        let hyids = rowsDataTB1[i].cells[0].innerText.trim();
        let QQData1 = parseInt(rowsDataTB1[i].cells[1].textContent.trim());
        let hasMatchingQQ = false;

        for (let j = 1; j < rowpsys.length; j++) {
            const [select, timeupload, name, Bonus, typebn, qq, phonenb, mail, sent, Timesent, opetor, cc] = rowpsys[j].split('\t');
            let qqNumber = parseInt(qq);

            if (QQData1 === qqNumber) {
                hasMatchingQQ = true;
                break;
            }
        }

        if (!hasMatchingQQ) {
            let newRow = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');

            cell1.textContent = hyids;
            cell2.textContent = 0.55;
            cell3.textContent = QQData1;

            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);

            fragment.appendChild(newRow);
        }
    }

    table3.appendChild(fragment);
count()
}

function copy2() {
    let table3 = document.getElementById("resultTable3");
    let copiedData = [];
    
    copiedData.push("会员账号\t奖励金额\t稽核倍数\t前台备注\t后台备注");

    if (table3.rows.length <=1) {alert("No data 0.55 to copy note temporary memory is from last copy");
        return;
}

        for (let i = 1; i < table3.rows.length; i++) {
            let memberId = table3.rows[i].cells[0].innerText;

            // Tạo chuỗi dữ liệu để sao chép vào textarea
            let rowData = memberId + "\t" + "0.55" + "\t" + "10" + "\t" + "【Bônus de Registro】" + "\t" + "【Bônus de Registro】";
            copiedData.push(rowData);
        }
    
    const textArea = document.createElement('textarea');
    textArea.value = copiedData.join('\n');
    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("copied acount member and bonus 0.55 to import file");
}

//------------------------------------------

function cl10() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '10.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
 hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 10 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 10 put in Cloud");
}

function cl20() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '20.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
           hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 20 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 20 put in Cloud");
}

function cl30() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '30.00' || bonus === '100.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
       hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 30 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 30 put in Cloud");
}

function cl50() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
 let hasDataToCopy = false;
    for (let i = 0; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '50.00' || bonus === '200.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
  hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 50 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 50 put in Cloud");
}
function cl5() {
    let table3 = document.getElementById("resultTable3");
    let copiedData = [];
    let hasDataToCopy = false;

    for (let i = 0; i < table3.rows.length; i++) {
        let bonus = table3.rows[i].cells[1].innerHTML.trim();

        if (bonus === '0.55') {
            let hyid = table3.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push('="' + hyid + '"');
            hasDataToCopy = true;
        }
    }

    if (!hasDataToCopy) {
        alert("No data with Bonus 0.55 to copy. Note: temporary memory is from the last copy.");
        return;
    }

    // Create a string with IDs separated by new lines
    let formattedData = copiedData.join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 0.55 and formatted. Data is now in the Cloud.");
}


//------------------------level---------------
function lv10() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '10.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
         hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 10 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join(',\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 10 to Modify Level");
}

function lv20() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '20.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
             hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 20 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join(',\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 20 to Modify Level");
}

function lv30() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '30.00' || bonus === '100.00') {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
        hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 30 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join(',\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 30 to Modify Level");
}

function lv50() {
    let table2 = document.getElementById("resultTable2");
    let copiedData = [];
    let hasDataToCopy = false;
    for (let i = 1; i < table2.rows.length; i++) {
        let bonus = table2.rows[i].cells[1].innerHTML.trim();

        if (bonus === '50.00' || bonus === 200.00 ) {
            let hyid = table2.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push(hyid);
           hasDataToCopy = true;
        }
    }
if (!hasDataToCopy) {
        alert("No data 50 to copy note temporary memory is from last copy");
        return;
}
    // Create a string with IDs separated by commas but no trailing comma
    let formattedData = copiedData.join(',\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 50 to Modify Level");
}

function lv5(){
    let table3 = document.getElementById("resultTable3");
    let copiedData = [];
    let hasDataToCopy = false;

    for (let i = 0; i < table3.rows.length; i++) {
        let bonus = table3.rows[i].cells[1].innerHTML.trim();

        if (bonus === '0.55') {
            let hyid = table3.rows[i].cells[0].innerHTML.trim();
            // Remove any equal signs or double quotes from the ID
            hyid = hyid.replace(/["=]/g, '');
            copiedData.push( hyid);
            hasDataToCopy = true;
        }
    }

    if (!hasDataToCopy) {
        alert("No data with Bonus 0.55 to copy. Note: temporary memory is from the last copy.");
        return;
    }

    // Create a string with IDs separated by new lines
    let formattedData = copiedData.join('\n');

    const textArea = document.createElement('textarea');
    textArea.value = formattedData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("Copied IDs with Bonus 0.55 to send mail");
}


function count() {
    const table4 = document.getElementById("resultTable4");
    const headerRow = table4.rows[0];
    table4.innerHTML = "";
    table4.appendChild(headerRow);
     
    const table2 = document.getElementById("resultTable2");
    const bonus = Array.from(table2.rows).map(row => parseInt(row.cells[1].innerHTML.trim()));
    
    const table3 = document.getElementById("resultTable3");
    const bonus055 = Array.from(table3.rows).map(row => parseFloat(row.cells[1].innerHTML.trim()));
    
    let countvl10 = 10;
    let countvl20 = 20;
    let countvl30 = 30;
    let countvl50 = 50;
    let countvl100 = 100;
    let countvl200 = 200;
    let counttv055 = 0.55;
    
    const count10 = bonus.reduce((acc, val) => val === countvl10 ? acc + 1 : acc, 0);
    const count20 = bonus.reduce((acc, val) => val === countvl20 ? acc + 1 : acc, 0);
    const count30 = bonus.reduce((acc, val) => val === countvl30 || val === countvl100 ? acc + 1 : acc, 0);
    const count50 = bonus.reduce((acc, val) => val === countvl50 || val === countvl200 ? acc + 1 : acc, 0);
    const Total = count10 + count20 + count30 + count50;
    
    const count0_55 = bonus055.reduce((acc, val) => val === counttv055 ? acc + 1 : acc, 0); 
    
    table4.innerHTML += "<tr><td>Count</td><td>" + count10 + "</td><td>" + count20 + "</td><td>" + count30 + "</td><td>" + count50 + "</td><td>" + Total + "</td><td>" + count0_55 + "</td></tr>";
}
