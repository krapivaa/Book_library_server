module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('books', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING(10000),
            allowNull: true
        },
        haveRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        willRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING(10000),
            allowNull: true
        }
    })
    return Books;
};