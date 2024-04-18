import fs from 'fs/promises';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const list = fs.readFile(contactsPath, { encoding: "utf-8" })
    .then(data => {
        const parsedData = JSON.parse(data);
        return parsedData
    })
    .catch(error => console.log(error));


const writeList = data => fs.writeFile(contactsPath, data);


export async function listContacts() {
    console.table(await list);
}

export async function getContactById(contactId) {
    const awaitedList = await list;
    const contact = awaitedList.find(contact => contact.id === contactId);

    console.log(contact ?? null);
}

export async function removeContact(contactId) {
    const awaitedList = await list;
    const contact = awaitedList.find(contact => contact.id === contactId);
    if (contact) {
        const index = awaitedList.indexOf(contact);
        awaitedList.splice(index, 1);

        writeList(JSON.stringify(awaitedList));
        console.log(contact);
    } else {
        console.log(null);
    }

}

export async function addContact(name, email, phone) {
    const awaitedList = await list;

    const newContact = {
        id: Math.floor(Math.random() * 10000000000000).toString(),
        name,
        email,
        phone
    }

    awaitedList.push(newContact)

    writeList(JSON.stringify(awaitedList));
    console.log(awaitedList);
}
