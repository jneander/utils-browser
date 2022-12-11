import {LocalStorage} from './local-storage'

describe('ClientStorage', () => {
  let clientStorage: LocalStorage

  beforeEach(() => {
    clientStorage = new LocalStorage()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('#getJson()', () => {
    beforeEach(() => {
      clientStorage.setJson('unrelated', 'unrelated value')
    })

    it('returns the value saved with the given key', () => {
      clientStorage.setJson('example', 'example value')
      expect(clientStorage.getJson('example')).to.equal('example value')
    })

    describe('when no data is saved with the given key', () => {
      it('returns the given default value', () => {
        expect(clientStorage.getJson('example', 'default value')).to.equal('default value')
      })

      it('returns undefined when not given a default value', () => {
        expect(clientStorage.getJson('example')).to.be.undefined
      })
    })

    describe('when not scoped', () => {
      it('does not return data saved with a scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        scopedStorage.setJson('example', 'example value')
        expect(clientStorage.getJson('example')).to.be.undefined
      })
    })

    describe('when scoped', () => {
      it('returns the data saved in the configured scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        scopedStorage.setJson('example', 'example value')
        expect(scopedStorage.getJson('example')).to.equal('example value')
      })

      it('does not return data saved in a different scope', () => {
        const storageA = new LocalStorage('scope-a')
        const storageB = new LocalStorage('scope-b')
        storageA.setJson('example', 'example value')
        expect(storageB.getJson('example')).to.be.undefined
      })

      it('does not return data saved without a scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        expect(scopedStorage.getJson('unrelated')).to.be.undefined
      })
    })

    describe('serialization', () => {
      it('preserves undefined data', () => {
        clientStorage.setJson('example', undefined)
        expect(clientStorage.getJson('example')).to.equal(undefined)
      })

      it('preserves null data', () => {
        clientStorage.setJson('example', null)
        expect(clientStorage.getJson('example')).to.equal(null)
      })

      it('preserves boolean data', () => {
        clientStorage.setJson('example', true)
        expect(clientStorage.getJson('example')).to.equal(true)
      })

      it('preserves string data', () => {
        clientStorage.setJson('example', 'true')
        expect(clientStorage.getJson('example')).to.equal('true')
      })

      it('preserves numerical data', () => {
        clientStorage.setJson('example', 12345.6789)
        expect(clientStorage.getJson('example')).to.equal(12345.6789)
      })

      it('preserves object data', () => {
        const object = Object.freeze({
          one: 1,
          two: {
            deeper: true,
            data: 'yes',
            'even-deeper': {
              nil: null,
            },
          },
        })
        clientStorage.setJson('example', object)
        expect(clientStorage.getJson('example')).to.deep.equal(object)
      })
    })
  })

  describe('#getString()', () => {
    beforeEach(() => {
      clientStorage.setString('unrelated', 'unrelated value')
    })

    it('returns the value saved with the given key', () => {
      clientStorage.setString('example', 'example value')
      expect(clientStorage.getString('example')).to.equal('example value')
    })

    describe('when no data is saved with the given key', () => {
      it('returns the given default value', () => {
        expect(clientStorage.getString('example', 'default value')).to.equal('default value')
      })

      it('returns undefined when not given a default value', () => {
        expect(clientStorage.getString('example')).to.be.undefined
      })
    })

    describe('when not scoped', () => {
      it('does not return data saved with a scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        scopedStorage.setString('example', 'example value')
        expect(clientStorage.getString('example')).to.be.undefined
      })
    })

    describe('when scoped', () => {
      it('returns the data saved in the configured scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        scopedStorage.setString('example', 'example value')
        expect(scopedStorage.getString('example')).to.equal('example value')
      })

      it('does not return data saved in a different scope', () => {
        const storageA = new LocalStorage('scope-a')
        const storageB = new LocalStorage('scope-b')
        storageA.setString('example', 'example value')
        expect(storageB.getString('example')).to.be.undefined
      })

      it('does not return data saved without a scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        expect(scopedStorage.getString('unrelated')).to.be.undefined
      })
    })
  })

  describe('#removeData()', () => {
    it('removes the data saved with the given key', () => {
      clientStorage.setJson('example', 'example value')
      clientStorage.removeData('example')
      expect(clientStorage.getJson('example', 'default value')).to.equal('default value')
    })

    it('has no effect when no data is saved with the given key', () => {
      expect(() => {
        clientStorage.removeData('example')
      }).not.to.throw
    })

    describe('when scoped', () => {
      it('removes the data saved in the configured scope', () => {
        const scopedStorage = new LocalStorage('example-scope')
        scopedStorage.setJson('example', 'example value')
        scopedStorage.removeData('example')
        expect(scopedStorage.getJson('example')).to.be.undefined
      })

      it('does not remove data saved in a different scope', () => {
        const storageA = new LocalStorage('scope-a')
        const storageB = new LocalStorage('scope-b')
        storageA.setJson('example', 'value a')
        storageB.setJson('example', 'value b')
        storageA.removeData('example')
        expect(storageB.getJson('example')).to.equal('value b')
      })

      it('does not remove data saved without a scope', () => {
        clientStorage.setJson('example', 'client value')
        const scopedStorage = new LocalStorage('example-scope')
        scopedStorage.removeData('example')
        expect(clientStorage.getJson('example')).to.equal('client value')
      })
    })
  })
})
