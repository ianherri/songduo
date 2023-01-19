function generateId() {
  let id = ''
  let possible = 'ABCDEF0123456789'

  for (let i = 0; i < 10; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return id
}

export class Song {
  constructor(
    stanzaOrder, // array of stanzaIds
    authorId, // String uid
    authorName, // String
    visibility, // 'public', 'private', 'shared'
    coauthors, // array of uids
    title, // String
    stanzas // array of stanza
  ) {
    this.stanzaOrder = stanzaOrder
    this.authorId = authorId
    this.authorName = authorName
    this.timeCreated = new Date()
    this.visibility = visibility
    this.coauthors = coauthors
    this.title = title
    this.stanzas = stanzas
  }

  addStanza(authorId, authorName, text, type, parent) {
    const stanza = new Stanza(
      authorId,
      authorName,
      text,
      type,
      parent
    ).toObject()
    this.stanzas.push(stanza)
    this.stanzaOrder.push(stanza.id)
  }

  removeStanza(stanzaId) {
    this.stanzas.filter((stanza) => stanza.id != stanzaId)
  }

  toObject() {
    return {
      stanzaOrder: this.stanzaOrder,
      authorId: this.authorId, // String uid
      authorName: this.authorName, // String
      timeCreated: this.timeCreated,
      visibility: this.visibility, // 'public', 'private', 'shared'
      coauthors: this.coauthors, // array of uids
      title: this.title, // String
      stanzas: this.stanzas,
    }
  }

  saveSong() {}
}

export class Stanza {
  constructor(stanzaAuthorId, stanzaAuthorName, text, type, parent) {
    this.id = generateId() // random id
    this.stanzaAuthorId = stanzaAuthorId // String uid
    this.stanzaAuthorName = stanzaAuthorName // String
    this.text = text // String
    this.type = type // 'verse', 'chorus', 'refrain'
    this.parent = parent // Stanzaid || null
    this.timeCreated = new Date()
  }

  toObject() {
    return {
      id: this.id,
      stanzaAuthorId: this.stanzaAuthorId,
      stanzaAuthorName: this.stanzaAuthorName,
      text: this.text,
      type: this.type,
      parent: this.parent,
      timeCreated: this.timeCreated,
    }
  }
}
