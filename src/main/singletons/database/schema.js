import { DataTypes } from 'sequelize'
import database from './database'

let sequelize = database.getConnection()

const Ente = sequelize.define(
  'ente',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'entes',
    timestamps: true
  }
)

const Usuario = sequelize.define(
  'usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'usuarios',
    timestamps: true
  }
)

const Perfil = sequelize.define(
  'perfil',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },

    tipo_cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id'
      }
    },

    enteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ente,
        key: 'id'
      }
    }
  },
  {
    tableName: 'perfiles',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['tipo_cedula', 'cedula']
      }
    ]
  }
)

const PerfilMedico = sequelize.define(
  'perfil_medico',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    perfilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },

    patologias: {
      type: DataTypes.STRING,
      allowNull: true
    },

    medicamentos: {
      type: DataTypes.STRING,
      allowNull: true
    },

    alergias: {
      type: DataTypes.STRING,
      allowNull: true
    },

    cirugias: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'perfiles_medicos',
    timestamps: true
  }
)

Ente.hasMany(Perfil, { foreignKey: 'enteId' })
Usuario.hasOne(Perfil, { foreignKey: 'usuarioId' })
Perfil.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Perfil.belongsTo(Ente, { foreignKey: 'enteId' })
PerfilMedico.belongsTo(Perfil, { foreignKey: 'perfilId' })

export { Ente, Perfil, PerfilMedico, Usuario }
