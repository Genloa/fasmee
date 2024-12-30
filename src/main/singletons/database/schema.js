import { DataTypes, Sequelize } from 'sequelize'
import db from './database'

let sequelize = db.getConnection()

let Usuario = null
let Ente = null
let Perfil = null
let PerfilMedico = null
let Departamento = null
let Cita = null
let Almacen = null
let Articulo = null
let Historia = null
let Archivos = null
let Rol = null
let Permiso = null
let PerfilOnArticulo = null
let ColaPacientes = null
let PerfilOnBeneficiario = null
let RolOnPerfil = null
let RolOnPermiso = null
let ArticuloOnAlmacen = null
let Horarios = null

if (sequelize instanceof Sequelize) {
  Usuario = sequelize.define(
    'usuario',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

  Ente = sequelize.define(
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

  Departamento = sequelize.define(
    'departamento',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cubiculo: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'departamentos',
      timestamps: true
    }
  )

  Perfil = sequelize.define(
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
        allowNull: true,
        references: {
          model: Usuario,
          key: 'id'
        }
      },

      enteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Ente,
          key: 'id'
        }
      },

      departamentoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Departamento,
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
          fields: ['usuarioId']
        },
        {
          unique: true,
          fields: ['tipo_cedula', 'cedula']
        }
      ]
    }
  )

  PerfilMedico = sequelize.define(
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
          key: 'id',
          unique: true
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
      },

      peso: {
        type: DataTypes.FLOAT,
        allowNull: true
      },

      altura: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    },
    {
      tableName: 'perfiles_medicos',
      timestamps: true
    }
  )

  Cita = sequelize.define(
    'cita',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fecha_cita: {
        type: DataTypes.DATE,
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      perfilId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Perfil,
          key: 'id'
        }
      },
      pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Perfil,
          key: 'id'
        }
      },
      departamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Departamento,
          key: 'id'
        }
      }
    },
    {
      tableName: 'citas',
      timestamps: true
    }
  )

  Almacen = sequelize.define(
    'almacen',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cubiculo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'almacenes',
      timestamps: true
    }
  )

  Articulo = sequelize.define(
    'articulo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'articulos',
      timestamps: true
    }
  )

  Historia = sequelize.define(
    'historia',
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
      pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Perfil,
          key: 'id'
        }
      },
      departamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Departamento,
          key: 'id'
        }
      },
      fecha_atencion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      sintomas: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      diagnostico: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tratamiento: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      peso_paciente: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      tension_paciente: {
        type: DataTypes.STRING,
        allowNull: false
      },
      medida_cintura: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      medida_cadera: {
        type: DataTypes.DECIMAL,
        allowNull: true
      }
    },
    {
      tableName: 'historias',
      timestamps: true
    }
  )

  Archivos = sequelize.define(
    'archivos',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      historiaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Historia,
          key: 'id'
        }
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'archivos',
      timestamps: true
    }
  )

  Rol = sequelize.define(
    'rol',
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
      tableName: 'roles',
      timestamps: true
    }
  )

  Permiso = sequelize.define(
    'permiso',
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
      tableName: 'permisos',
      timestamps: true
    }
  )

  PerfilOnArticulo = sequelize.define(
    'perfil_on_articulo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      articuloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Articulo,
          key: 'id'
        }
      },

      perfilId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Perfil,
          key: 'id'
        }
      },

      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      fecha_retiro: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: 'perfiles_on_articulos',
      timestamps: true
    }
  )

  ColaPacientes = sequelize.define(
    'cola_pacientes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      perfilId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Perfil,
          key: 'id'
        }
      },
      pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Perfil,
          key: 'id'
        }
      },
      departamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Departamento,
          key: 'id'
        }
      }
    },
    {
      tableName: 'colas_pacientes',
      timestamps: true
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['departamentoId', 'pacienteId']
        }
      ]
    }
  )

  PerfilOnBeneficiario = sequelize.define(
    'perfil_on_beneficiario',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      perfilId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Perfil,
          key: 'id'
        }
      },
      beneficiarioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Perfil,
          key: 'id'
        }
      }
    },
    {
      tableName: 'perfiles_on_beneficiarios',
      timestamps: true
    }
  )

  RolOnPerfil = sequelize.define(
    'rol_on_perfil',
    {
      rolId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Rol,
          key: 'id'
        }
      },
      perfilId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Perfil,
          key: 'id'
        }
      }
    },
    {
      tableName: 'roles_on_perfiles',
      timestamps: true
    }
  )

  RolOnPermiso = sequelize.define(
    'rol_on_permiso',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      permisoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Permiso,
          key: 'id'
        }
      },
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Rol,
          key: 'id'
        }
      }
    },
    {
      tableName: 'roles_on_permisos',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['permisoId', 'rolId']
        }
      ]
    }
  )

  ArticuloOnAlmacen = sequelize.define(
    'articulo_on_almacen',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      almacenId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Almacen,
          key: 'id'
        }
      },
      articuloId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Articulo,
          key: 'id'
        }
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: 'articulos_on_almacenes',
      timestamps: true
    }
  )

  Horarios = sequelize.define(
    'horarios',
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
      dia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      turno: {
        type: DataTypes.ENUM('M', 'T', 'C'),
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Fecha en que asistira el medico rotativo'
      }
    },
    {
      tableName: 'horarios',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['perfilId', 'dia', 'turno']
        }
      ]
    }
  )

  // Relaciones del modelo usuario

  Usuario.hasOne(Perfil, { foreignKey: 'usuarioId', as: 'perfil' })

  // Relaciones del modelo ente

  Ente.hasMany(Perfil, { foreignKey: 'enteId', as: 'perfiles' })

  // Relaciones del modelo perfil

  Perfil.belongsTo(Ente, { foreignKey: 'enteId', as: 'ente' })
  Perfil.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' })
  Perfil.belongsTo(Departamento, { foreignKey: 'departamentoId', as: 'departamento' })
  Perfil.hasOne(PerfilMedico, { foreignKey: 'perfilId', as: 'perfilMedico' })
  Perfil.hasMany(ColaPacientes, { foreignKey: 'perfilId', as: 'colasPacientes' })
  Perfil.hasMany(ColaPacientes, { foreignKey: 'pacienteId', as: 'colasMedicos' })
  Perfil.hasMany(Cita, { foreignKey: 'perfilId', as: 'citasPendientes' })
  Perfil.hasMany(Cita, { foreignKey: 'pacienteId', as: 'citasSolicitadas' })
  Perfil.hasMany(Historia, { foreignKey: 'perfilId', as: 'pacientesAtendidos' })
  Perfil.hasMany(Historia, { foreignKey: 'pacienteId', as: 'historialMedico' })
  Perfil.hasMany(Horarios, { foreignKey: 'perfilId', as: 'horarios' })
  Perfil.belongsToMany(Articulo, {
    through: PerfilOnArticulo,
    as: 'articulos',
    foreignKey: 'perfilId',
    otherKey: 'articuloId'
  })
  Perfil.belongsToMany(Perfil, {
    through: PerfilOnBeneficiario,
    as: 'beneficiarios',
    foreignKey: 'perfilId',
    otherKey: 'beneficiarioId'
  })
  Perfil.belongsToMany(Perfil, {
    through: PerfilOnBeneficiario,
    as: 'trabajadores',
    foreignKey: 'beneficiarioId',
    otherKey: 'perfilId'
  })
  Perfil.belongsToMany(Rol, {
    through: RolOnPerfil,
    as: 'roles',
    foreignKey: 'perfilId',
    otherKey: 'rolId'
  })

  // Relaciones del modelo perfil_medico

  PerfilMedico.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfilmedico' })

  // Relaciones del modelo departamento

  Departamento.hasMany(ColaPacientes, { foreignKey: 'departamentoId', as: 'colasPacientes' })
  Departamento.hasMany(Cita, { foreignKey: 'departamentoId', as: 'citas' })
  Departamento.hasMany(Historia, { foreignKey: 'departamentoId', as: 'historias' })
  Departamento.hasMany(Perfil, { foreignKey: 'departamentoId', as: 'perfiles' })

  // Relaciones del modelo cita

  Cita.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
  Cita.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'doctor' })

  // Relaciones del modelo almacen

  Almacen.belongsToMany(Articulo, {
    through: ArticuloOnAlmacen,
    as: 'articulos',
    foreignKey: 'almacenId',
    otherKey: 'articuloId'
  })

  // Relaciones del modelo articulo

  Articulo.belongsToMany(Perfil, {
    through: PerfilOnArticulo,
    as: 'perfiles',
    foreignKey: 'articuloId',
    otherKey: 'perfilId'
  })
  Articulo.belongsToMany(Almacen, {
    through: ArticuloOnAlmacen,
    as: 'almacenes',
    foreignKey: 'articuloId',
    otherKey: 'almacenId'
  })

  // Relaciones del modelo historia

  Historia.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
  Historia.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'doctor' })
  Historia.belongsTo(Departamento, { foreignKey: 'departamentoId', as: 'departamento' })
  Historia.hasMany(Archivos, { foreignKey: 'historiaId', as: 'archivos' })

  // Relaciones del modelo archivos

  Archivos.belongsTo(Historia, { foreignKey: 'historiaId', as: 'historia' })

  // Relaciones del modelo rol

  Rol.belongsToMany(Perfil, {
    through: RolOnPerfil,
    as: 'perfiles',
    foreignKey: 'rolId',
    otherKey: 'perfilId'
  })
  Rol.belongsToMany(Permiso, {
    through: RolOnPermiso,
    as: 'permisos',
    foreignKey: 'rolId',
    otherKey: 'permisoId'
  })

  // Relaciones del modelo permiso

  Permiso.belongsToMany(Rol, {
    through: RolOnPermiso,
    as: 'roles',
    foreignKey: 'permisoId',
    otherKey: 'rolId'
  })

  // Relaciones del modelo perfil_on_articulo

  PerfilOnArticulo.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' })
  PerfilOnArticulo.belongsTo(Articulo, { foreignKey: 'articuloId', as: 'articulo' })

  // Relaciones del modelo cola_pacientes

  ColaPacientes.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' })
  ColaPacientes.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
  ColaPacientes.belongsTo(Departamento, { foreignKey: 'departamentoId', as: 'departamento' })

  // Relaciones del modelo perfil_on_beneficiario

  PerfilOnBeneficiario.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' })
  PerfilOnBeneficiario.belongsTo(Perfil, { foreignKey: 'beneficiarioId', as: 'beneficiario' })

  // Relaciones del modelo rol_on_perfil

  RolOnPerfil.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' })
  RolOnPerfil.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' })

  // Relaciones del modelo rol_on_permiso

  RolOnPermiso.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' })
  RolOnPermiso.belongsTo(Permiso, { foreignKey: 'permisoId', as: 'permiso' })

  // Relaciones del modelo articulo_on_almacen

  ArticuloOnAlmacen.belongsTo(Articulo, { foreignKey: 'articuloId', as: 'articulo' })
  ArticuloOnAlmacen.belongsTo(Almacen, { foreignKey: 'almacenId', as: 'almacen' })

  // Relaciones del modelo horarios

  Horarios.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' })
}

export {
  Almacen,
  Archivos,
  Articulo,
  ArticuloOnAlmacen,
  Cita,
  ColaPacientes,
  Departamento,
  Ente,
  Historia,
  Horarios,
  Perfil,
  PerfilMedico,
  PerfilOnArticulo,
  PerfilOnBeneficiario,
  Permiso,
  Rol,
  RolOnPerfil,
  RolOnPermiso,
  Usuario
}
