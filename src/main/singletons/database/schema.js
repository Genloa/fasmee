import { DataTypes } from 'sequelize'
import database from './database'

let sequelize = database.getConnection()

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

const Departamento = sequelize.define(
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

const Cita = sequelize.define(
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
    PerfilId: {
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

const Almacen = sequelize.define(
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

const Articulo = sequelize.define(
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

const Historia = sequelize.define(
  'historia',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PerfilId: {
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

const Ingreso = sequelize.define(
  'ingreso',
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
    tableName: 'ingresos',
    timestamps: true
  }
)

const Rol = sequelize.define(
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

const Permiso = sequelize.define(
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

const Servicio = sequelize.define(
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

const PerfilOnArticulo = sequelize.define(
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

    PerfilId: {
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

const ColaPacientes = sequelize.define(
  'cola_pacientes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PerfilId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfil,
        key: 'id'
      }
    },
    DepartamentoId: {
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

const PerfilOnBeneficiario = sequelize.define(
  'perfil_on_beneficiario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PerfilId: {
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

const RolOnPerfil = sequelize.define(
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
    PerfilId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    }
  },
  {
    tableName: 'roles_on_Perfiles',
    timestamps: true
  }
)

const RolOnPermiso = sequelize.define(
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

const DepartamentoOnPerfil = sequelize.define(
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
    PerfilId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Perfil,
        key: 'id'
      }
    }
  },
  {
    tableName: 'departamentos_on_Perfiles',
    timestamps: true
  }
)

const PerfilOnServicio = sequelize.define(
  'perfil_on_servicio',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PerfilId: {
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

const ArticuloOnAlmacen = sequelize.define(
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
    }
  },
  {
    tableName: 'articulos_on_almacenes',
    timestamps: true
  }
)

Ente.hasMany(Perfil, { foreignKey: 'enteId' })

Usuario.hasOne(Perfil, { foreignKey: 'usuarioId' })

Perfil.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Perfil.belongsTo(Ente, { foreignKey: 'enteId' })
Perfil.hasOne(PerfilMedico, { foreignKey: 'perfilId' })
Perfil.hasMany(Cita, { foreignKey: 'PerfilId', as: 'citasPendientes' })
Perfil.hasMany(Cita, { foreignKey: 'pacienteId', as: 'citasSolicitadas' })
Perfil.hasMany(Historia, { foreignKey: 'PerfilId', as: 'pacientesAtendidos' })
Perfil.hasMany(Historia, { foreignKey: 'pacienteId', as: 'historialMedico' })
Perfil.hasMany(ColaPacientes, { foreignKey: 'PerfilId' })
Perfil.belongsToMany(Perfil, {
  through: PerfilOnBeneficiario,
  as: 'beneficiarios',
  foreignKey: 'PerfilId',
  otherKey: 'beneficiarioId'
})

Perfil.belongsToMany(Rol, { through: RolOnPerfil, foreignKey: 'PerfilId' })
Perfil.belongsToMany(Departamento, { through: DepartamentoOnPerfil, foreignKey: 'PerfilId' })
Perfil.belongsToMany(Servicio, { through: PerfilOnServicio, foreignKey: 'PerfilId' })
Perfil.belongsToMany(Articulo, { through: PerfilOnArticulo, foreignKey: 'PerfilId' })

PerfilMedico.belongsTo(Perfil, { foreignKey: 'perfilId' })

Cita.belongsTo(Perfil, { foreignKey: 'PerfilId', as: 'solicitante' })
Cita.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
Cita.belongsTo(Departamento, { foreignKey: 'departamentoId' })

Historia.belongsTo(Perfil, { foreignKey: 'PerfilId', as: 'medico' })
Historia.belongsTo(Perfil, { foreignKey: 'pacienteId', as: 'paciente' })
Historia.belongsTo(Departamento, { foreignKey: 'departamentoId' })

Departamento.hasMany(Cita, { foreignKey: 'departamentoId' })
Departamento.hasMany(ColaPacientes, { foreignKey: 'DepartamentoId' })
Departamento.hasMany(Historia, { foreignKey: 'departamentoId' })
Departamento.belongsToMany(Perfil, { through: DepartamentoOnPerfil, foreignKey: 'departamentoId' })

Ingreso.belongsTo(Articulo, { foreignKey: 'articuloId' })
Ingreso.belongsTo(Almacen, { foreignKey: 'almacenId' })

Articulo.hasMany(Ingreso, { foreignKey: 'articuloId' })
Articulo.belongsToMany(Perfil, { through: PerfilOnArticulo, foreignKey: 'articuloId' })
Articulo.belongsToMany(Almacen, { through: ArticuloOnAlmacen, foreignKey: 'articuloId' })

Almacen.hasMany(Ingreso, { foreignKey: 'almacenId' })
Almacen.belongsToMany(Articulo, { through: ArticuloOnAlmacen, foreignKey: 'almacenId' })

ColaPacientes.belongsTo(Perfil, { foreignKey: 'PerfilId' })
ColaPacientes.belongsTo(Departamento, { foreignKey: 'DepartamentoId' })

Rol.belongsToMany(Perfil, { through: RolOnPerfil, foreignKey: 'rolId' })
Rol.belongsToMany(Permiso, { through: RolOnPermiso, foreignKey: 'rolId' })

Permiso.belongsToMany(Rol, { through: RolOnPermiso, foreignKey: 'permisoId' })

Servicio.belongsToMany(Perfil, { through: PerfilOnServicio, foreignKey: 'servicioId' })

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
  Ingreso,
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
