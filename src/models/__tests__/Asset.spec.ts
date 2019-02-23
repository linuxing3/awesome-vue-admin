import AssetModel from '../Asset'

describe('@/models/Asset', () => {
  it('exports a valid Vuex ORM Model', () => {

    const model = new AssetModel();

    expect(model.name).toBe("none");
  })

  it('expect string field', ()=> {
    expect(new AssetModel({}).name).toBe("none");
    expect(new AssetModel({ name: "none" }).name).toBe("none");
  })

  it('expect to json', ()=> {
    const model = new AssetModel();
    const json = model.$toJson();

    const expected = {
      _id: 1,
      name: "none"
    };

    expect(json).not.toBeInstanceOf(AssetModel);
    expect(json.name).toEqual(expected.name);
  })
})


