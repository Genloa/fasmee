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
let Rol = null
let Permiso = null
let Servicio = null
let PerfilOnArticulo = null
let ColaPacientes = null
let PerfilOnBeneficiario = null
let RolOnPerfil = null
let RolOnPermiso = null
let DepartamentoOnPerfil = null
let PerfilOnServicio = null
let ArticuloOnAlmacen = null

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

  Servicio = sequelize.define(
    'servicio',
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
      tableName: 'servicios',
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

  DepartamentoOnPerfil = sequelize.define(
    'departamento_on_perfil',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      departamentoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Departamento,
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
      tableName: 'departamentos_on_perfiles',
      timestamps: true
    }
  )

  PerfilOnServicio = sequelize.define(
    'perfil_on_servicio',
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
      servicioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: Servicio,
          key: 'id'
        }
      },
      fecha_emision: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fecha_recepcion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      resultados: {
        type: DataTypes.STRING(1000),
        allowNull: true
      }
    },
    {
      tableName: 'perfiles_on_servicios',
      timestamps: true
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

  Ente.hasMany(Perfil, { foreignKey: 'enteId' })

  Usuario.hasOne(Perfil, { foreignKey: 'usuarioId', as: 'perfil' })

  Perfil.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' })
  Perfil.belongsTo(Ente, { foreignKey: 'enteId' })
  Perfil.hasOne(PerfilMedico, { foreignKey: 'perfilId', as: 'perfilMedico' })
  Perfil.hasMany(Cita, { foreignKey: 'perfilId', as: 'citasPendientes' })
  Perfil.hasMany(Cita, { foreignKey: 'pacienteId', as: 'citasSolicitadas' })
  Perfil.hasMany(Historia, { foreignKey: 'perfilId', as: 'pacientesAtendidos' })
  Perfil.hasMany(Historia, { foreignKey: 'pacienteId', as: 'historialMedico' })
  Perfil.hasMany(ColaPacientes, { foreignKey: 'perfilId' })

  Perfil.belongsToMany(Perfil, {
    through: PerfilOnBeneficiario,
    as: 'beneficiarios',
    foreignKey: 'perfilId',
    otherKey: 'beneficiarioId'
  })

  Perfil.belongsToMany(Rol, {
    through: RolOnPerfil,
    foreignKey: 'perfilId',
    otherKey: 'rolId',
    as: 'roles'
  })

  Perfil.belongsToMany(Departamento, {
    through: DepartamentoOnPerfil,
    as: 'departamentos',
    foreignKey: 'perfilId'
  })
  Perfil.belongsToMany(Servicio, { through: PerfilOnServicio, foreignKey: 'perfilId' })
  Perfil.belongsToMany(Articulo, { through: PerfilOnArticulo, foreignKey: 'perfilId' })

  PerfilMedico.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfilmedico' })

  Cita.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'solicitante' })
  Cita.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
  Cita.belongsTo(Departamento, { foreignKey: 'departamentoId' })

  Historia.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'medico' })
  Historia.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
  Historia.belongsTo(Departamento, { foreignKey: 'departamentoId' })

  Departamento.hasMany(Cita, { foreignKey: 'departamentoId' })
  Departamento.hasMany(ColaPacientes, { foreignKey: 'departamentoId' })
  Departamento.hasMany(Historia, { foreignKey: 'departamentoId' })
  Departamento.belongsToMany(Perfil, {
    through: DepartamentoOnPerfil,
    foreignKey: 'departamentoId'
  })

  Articulo.belongsToMany(Perfil, { through: PerfilOnArticulo, foreignKey: 'articuloId' })
  Articulo.belongsToMany(Almacen, { through: ArticuloOnAlmacen, foreignKey: 'articuloId' })

  Almacen.belongsToMany(Articulo, { through: ArticuloOnAlmacen, foreignKey: 'almacenId' })

  ColaPacientes.belongsTo(Perfil, { foreignKey: 'perfilId' })
  ColaPacientes.belongsTo(Departamento, { foreignKey: 'departamentoId' })

  Rol.belongsToMany(Perfil, { through: RolOnPerfil, foreignKey: 'rolId' })
  Rol.belongsToMany(Permiso, { through: RolOnPermiso, foreignKey: 'rolId' })

  Permiso.belongsToMany(Rol, { through: RolOnPermiso, foreignKey: 'permisoId' })

  Servicio.belongsToMany(Perfil, { through: PerfilOnServicio, foreignKey: 'servicioId' })
}

export {
  Almacen,
  Articulo,
  ArticuloOnAlmacen,
  Cita,
  ColaPacientes,
  Departamento,
  DepartamentoOnPerfil,
  Ente,
  Historia,
  Perfil,
  PerfilMedico,
  PerfilOnArticulo,
  PerfilOnBeneficiario,
  PerfilOnServicio,
  Permiso,
  Rol,
  RolOnPerfil,
  RolOnPermiso,
  Servicio,
  Usuario
}
