(()=>{"use strict";function n(n,t,e,o){return new Promise((function(a,r){var c,i,u,l=window.indexedDB.open(n,1);l.onupgradeneeded=function(n){l.result.createObjectStore(t,{keyPath:"_id",autoIncrement:!0})},l.onerror=function(n){console.log("There was an error")},l.onsuccess=function(n){switch(c=l.result,i=c.transaction(t,"readwrite"),u=i.objectStore(t),c.onerror=function(n){console.log("error")},e){case"post":u.add(o);break;case"put":u.put(o);break;case"delete":u.delete(o._id);break;case"deleteAll":u.clear();break;default:var r=u.getAll();r.onsuccess=function(){a(r.result)}}i.oncomplete=function(){c.close()}}}))}var t,e=[];function o(){var n=e.reduce((function(n,t){return n+parseInt(t.value)}),0);document.querySelector("#total").textContent=n}function a(){var n=document.querySelector("#tbody");n.innerHTML="",e.forEach((function(t){var e=document.createElement("tr");e.innerHTML="\n      <td>".concat(t.name,"</td>\n      <td>").concat(t.value,"</td>\n    "),n.appendChild(e)}))}function r(){var n=e.slice().reverse(),o=0,a=n.map((function(n){var t=new Date(n.date);return"".concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear())})),r=n.map((function(n){return o+=parseInt(n.value)}));t&&t.destroy();var c=document.getElementById("myChart").getContext("2d");t=new Chart(c,{type:"line",data:{labels:a,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:r}]}})}function c(t){var c=document.querySelector("#t-name"),i=document.querySelector("#t-amount"),u=document.querySelector(".form .error");if(""!==c.value&&""!==i.value){u.textContent="";var l={name:c.value,value:i.value,date:(new Date).toISOString()};t||(l.value*=-1),e.unshift(l),r(),a(),o(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(l),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((function(n){return n.json()})).then((function(n){n.errors?u.textContent="Missing Information":(c.value="",i.value="")})).catch((function(t){!function(t){n("transactions","TransactionStore","post",t).then((function(n){e=n,o(),a(),r()}))}(l),c.value="",i.value=""}))}else u.textContent="Missing Information"}fetch("/api/transaction").then((function(n){return n.json()})).then((function(n){e=n,o(),a(),r()})),window.addEventListener("online",(function(){n("transactions","TransactionStore","get").then((function(t){t.length&&fetch("/api/transaction").then((function(n){return n.json()})).then((function(c){var i=t.filter((function(n){return!c.some((function(t){return t._id===n._id}))})).map((function(n){return{name:n.name,value:n.value,date:n.date}}));fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(i),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((function(n){return n.json()})).then((function(){fetch("/api/transaction").then((function(n){return n.json()})).then((function(t){return n("transactions","TransactionStore","deleteAll"),t.forEach((function(t){return n("transactions","TransactionStore","post",t)})),t})).then((function(n){console.log(n),e=n,o(),a(),r()}))})).catch((function(n){throw console.log("ERROR!"),n}))}))}))})),document.querySelector("#add-btn").onclick=function(){c(!0)},document.querySelector("#sub-btn").onclick=function(){c(!1)}})();