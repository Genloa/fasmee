import superFs from '@supercharge/fs'
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
let ArticuloIngresado = null
let Historia = null
let Archivo = null
let Rol = null
let Permiso = null
let PerfilOnArticulo = null
let ColaPacientes = null
let PerfilOnBeneficiario = null
let RolOnPerfil = null
let RolOnPermiso = null
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

      genero: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
        defaultValue: 'M'
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
      },

      profilePhotoPath: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          // retorna la imagen de perfil en base64 si existe
          if (this.getDataValue('profilePhotoPath')) {
            let imageBase64 = superFs.readFileSync(this.getDataValue('profilePhotoPath'), 'base64')
            return `data:image/jpeg;base64,${imageBase64}`
          }

          return null
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

      antecedentes: {
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
      almacenId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Almacen,
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
      tableName: 'articulos',
      timestamps: true
    }
  )

  ArticuloIngresado = sequelize.define(
    'articulo_ingresado',
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
      tableName: 'articulos_ingresados',
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
        allowNull: true
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: true
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
        allowNull: true
      },
      medida_cintura: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      medida_cadera: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      formulario: {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      tableName: 'historias',
      timestamps: true
    }
  )

  Archivo = sequelize.define(
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
        allowNull: false,
        get() {
          // retorna la imagen de perfil en base64 si existe
          if (this.getDataValue('path')) {
            let imageBase64 = superFs.readFileSync(this.getDataValue('path'), 'base64')
            return `data:image/jpeg;base64,${imageBase64}`
          }

          return null
        }
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
        allowNull: false,
        unique: true
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
          fields: ['perfilId', 'dia', 'turno', 'fecha']
        }
      ]
    }
  )

  // Relaciones del modelo usuario

  Usuario.hasOne(Perfil, {
    foreignKey: 'usuarioId',
    as: 'perfil',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo ente

  Ente.hasMany(Perfil, {
    foreignKey: 'enteId',
    as: 'perfiles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo perfil

  Perfil.belongsTo(Ente, {
    foreignKey: 'enteId',
    as: 'ente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.belongsTo(Departamento, {
    foreignKey: 'departamentoId',
    as: 'departamento',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasOne(PerfilMedico, {
    foreignKey: 'perfilId',
    as: 'perfilMedico',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(ColaPacientes, {
    foreignKey: 'perfilId',
    as: 'colasPacientes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(ColaPacientes, {
    foreignKey: 'pacienteId',
    as: 'colasMedicos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(Cita, {
    foreignKey: 'perfilId',
    as: 'citasPendientes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(Cita, {
    foreignKey: 'pacienteId',
    as: 'citasSolicitadas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(Historia, {
    foreignKey: 'perfilId',
    as: 'pacientesAtendidos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(Historia, {
    foreignKey: 'pacienteId',
    as: 'historialMedico',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.hasMany(Horarios, {
    foreignKey: 'perfilId',
    as: 'horarios',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.belongsToMany(Articulo, {
    through: PerfilOnArticulo,
    as: 'articulos',
    foreignKey: 'perfilId',
    otherKey: 'articuloId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.belongsToMany(Perfil, {
    through: PerfilOnBeneficiario,
    as: 'beneficiarios',
    foreignKey: 'perfilId',
    otherKey: 'beneficiarioId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.belongsToMany(Perfil, {
    through: PerfilOnBeneficiario,
    as: 'trabajadores',
    foreignKey: 'beneficiarioId',
    otherKey: 'perfilId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Perfil.belongsToMany(Rol, {
    through: RolOnPerfil,
    as: 'roles',
    foreignKey: 'perfilId',
    otherKey: 'rolId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo perfil_medico

  PerfilMedico.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'perfilmedico',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo departamento

  Departamento.hasMany(ColaPacientes, {
    foreignKey: 'departamentoId',
    as: 'colasPacientes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Departamento.hasMany(Cita, {
    foreignKey: 'departamentoId',
    as: 'citas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Departamento.hasMany(Historia, {
    foreignKey: 'departamentoId',
    as: 'historias',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Departamento.hasMany(Perfil, {
    foreignKey: 'departamentoId',
    as: 'perfiles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo cita

  Cita.belongsTo(Perfil, {
    foreignKey: 'pacienteId',
    as: 'paciente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Cita.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'doctor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo almacen
  Almacen.hasMany(Articulo, {
    foreignKey: 'almacenId',
    as: 'articulos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo articulo
  Articulo.belongsTo(Almacen, {
    foreignKey: 'almacenId',
    as: 'almacen',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Articulo.hasMany(ArticuloIngresado, {
    foreignKey: 'articuloId',
    as: 'ingresos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Articulo.belongsToMany(Perfil, {
    through: PerfilOnArticulo,
    as: 'perfiles',
    foreignKey: 'articuloId',
    otherKey: 'perfilId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo articulo_ingresado

  ArticuloIngresado.belongsTo(Articulo, {
    foreignKey: 'articuloId',
    as: 'articulo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo historia

  Historia.belongsTo(Perfil, {
    foreignKey: 'pacienteId',
    as: 'paciente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Historia.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'doctor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Historia.belongsTo(Departamento, {
    foreignKey: 'departamentoId',
    as: 'departamento',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Historia.hasMany(Archivo, {
    foreignKey: 'historiaId',
    as: 'archivos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo archivos

  Archivo.belongsTo(Historia, {
    foreignKey: 'historiaId',
    as: 'historia',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo rol

  Rol.belongsToMany(Perfil, {
    through: RolOnPerfil,
    as: 'perfiles',
    foreignKey: 'rolId',
    otherKey: 'perfilId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Rol.belongsToMany(Permiso, {
    through: RolOnPermiso,
    as: 'permisos',
    foreignKey: 'rolId',
    otherKey: 'permisoId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo permiso

  Permiso.belongsToMany(Rol, {
    through: RolOnPermiso,
    as: 'roles',
    foreignKey: 'permisoId',
    otherKey: 'rolId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo perfil_on_articulo

  PerfilOnArticulo.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'perfil',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  PerfilOnArticulo.belongsTo(Articulo, {
    foreignKey: 'articuloId',
    as: 'articulo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo cola_pacientes

  ColaPacientes.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'perfil',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ColaPacientes.belongsTo(Perfil, {
    foreignKey: 'pacienteId',
    as: 'paciente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ColaPacientes.belongsTo(Departamento, {
    foreignKey: 'departamentoId',
    as: 'departamento',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo perfil_on_beneficiario

  PerfilOnBeneficiario.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'perfil',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  PerfilOnBeneficiario.belongsTo(Perfil, {
    foreignKey: 'beneficiarioId',
    as: 'beneficiario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo rol_on_perfil

  RolOnPerfil.belongsTo(Rol, {
    foreignKey: 'rolId',
    as: 'rol',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  RolOnPerfil.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'perfil',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo rol_on_permiso

  RolOnPermiso.belongsTo(Rol, {
    foreignKey: 'rolId',
    as: 'rol',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  RolOnPermiso.belongsTo(Permiso, {
    foreignKey: 'permisoId',
    as: 'permiso',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // Relaciones del modelo horarios

  Horarios.belongsTo(Perfil, {
    foreignKey: 'perfilId',
    as: 'perfil',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
}

export {
  Almacen,
  Archivo,
  Articulo,
  ArticuloIngresado,
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
