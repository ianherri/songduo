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
    authorId, // String uid
    authorName, // String
    coauthors, // array of uids
    title, // String
    stanzas, // array of stanza
    stanzaOrder, // array of stanzaIds
    visibility, // 'public', 'private', 'shared'
    timeCreated = new Date()
  ) {
    this.id = ''
    this.authorId = authorId
    this.authorName = authorName
    this.coauthors = coauthors
    this.title = title
    this.stanzas = stanzas
    this.stanzaOrder = stanzaOrder
    this.visibility = visibility
    this.timeCreated = timeCreated
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

  setId(id) {
    this.id = id
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
  constructor(
    stanzaAuthorId,
    stanzaAuthorName,
    text,
    type,
    parent,
    children = []
  ) {
    this.id = generateId() // random id
    this.stanzaAuthorId = stanzaAuthorId // String uid
    this.stanzaAuthorName = stanzaAuthorName // String
    this.text = text // String
    this.type = type // 'verse', 'chorus', 'refrain'
    this.parent = parent // Stanzaid || null
    this.children = children
    this.timeCreated = new Date()
  }

  /**
   *
   * @param id another stanza id
   */
  addParent(id) {
    this.parent = id
  }

  addChild(child) {
    this.children.push(child)
  }

  toObject() {
    return {
      id: this.id,
      stanzaAuthorId: this.stanzaAuthorId,
      stanzaAuthorName: this.stanzaAuthorName,
      text: this.text,
      type: this.type,
      parent: this.parent,
      children: this.children,
      timeCreated: this.timeCreated,
    }
  }
}
