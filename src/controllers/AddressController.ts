import Address from "../models/Address";

export class AddressController {

    static async addAddress(req, res, next) {
        const data = req.body;
        const user_id = req.user.aud;
        try {
            const addressData = {
                user_id,
                title: data.title,
                address: data.address,
                landmark: data.landmark,
                house: data.house,
                lat: data.lat,
                lng: data.lng
            }
            const address = await new Address(addressData).save();
            // delete address.user_id;
            // delete address.__v;
            const response_address = {
                title: address.title,
                address: address.address,
                landmark: address.landmark,
                house: address.house,
                lat: address.lat,
                lng: address.lng,
                created_at: address.created_at,
                updated_at: address.updated_at
            };
            res.send(response_address);
        } catch(e) {
            next(e);
        }
    }

    static async getUserAddresses(req, res, next) {
        const user_id = req.user.aud;
        try {
            const addresses = await Address.find({ user_id }, {user_id: 0, __v: 0}); 
            res.send(addresses);
        } catch(e) {
            next(e);
        }
    }

    static async getUserLimitedAddresses(req, res, next) {
        const user_id = req.user.aud;
        const limit = req.query.limit;
        try {
            const addresses = await Address.find({ user_id }, {user_id: 0, __v: 0}).limit(limit); 
            res.send(addresses);
        } catch(e) {
            next(e);
        }
    }

    static async deleteAddress(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id;
        try {
            await Address.findOneAndDelete(
                { 
                    user_id: user_id,
                    _id: id
                }
            ); 
            res.json({ success: true });
        } catch(e) {
            next(e);
        }
    }

    static async getAddressById(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id;
        try {
            const address = await Address.findOne(
                { 
                    user_id: user_id,
                    _id: id
                },
                { user_id: 0, __v: 0 }
            ); 
            res.send(address);
        } catch(e) {
            next(e);
        }
    }

    static async editAddress(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id;
        const data = req.body;
        try {
            const address = await Address.findOneAndUpdate(
                { 
                    user_id: user_id,
                    _id: id
                },
                {
                    title: data.title,
                    address: data.address,
                    landmark: data.landmark,
                    house: data.house,
                    lat: data.lat,
                    lng: data.lng,
                    updated_at: new Date()
                },
                { new: true, projection: { user_id: 0, __v: 0 } }
            ); 
            if(address) {
                res.send(address);
            } else {
                // throw new Error('Address doesn\'t exist');
                throw('Address doesn\'t exist');
            }
        } catch(e) {
            next(e);
        }
    }

    static async checkAddress(req, res, next) {
        const user_id = req.user.aud;
        const data = req.query;
        try {
            const address = await Address.findOne(
                { user_id, lat: data.lat, lng: data.lng }, 
                { user_id: 0, __v: 0 }
            ); 
            res.send(address);
        } catch(e) {
            next(e);
        }
    }

}