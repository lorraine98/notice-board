const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const deleteOption = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

async function modifyPost(id) {
  const password = prompt("Enter password");

  if (!password) {
    return;
  }

  const result = await fetch("/check-password", {
    ...postOption,
    body: JSON.stringify({ id, password }),
  });

  const data = await result.json();

  if (data.isExist) {
    document.location = `/modify/${id}`;
  } else {
    alert("WRONG PASSWORD");
  }
}

async function deletePost(id) {
  const password = prompt("Enter password");

  if (!password) {
    return;
  }

  console.log(id);
  const result = await fetch("/delete", {
    ...deleteOption,
    body: JSON.stringify({ id, password }),
  });

  const data = await result.json();

  if (data.isSuccess) {
    document.location = "/";
  } else {
    alert("WRONG PASSWORD");
  }
}
